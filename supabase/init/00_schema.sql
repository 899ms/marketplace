

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE OR REPLACE FUNCTION "public"."handle_new_user"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'public'
    AS $$
BEGIN
  -- Insert into public.users, matching the actual columns in your table
  INSERT INTO public.users (id, full_name, user_type, username) -- Removed 'email'
  VALUES (
    NEW.id,                         -- The id from auth.users
    NEW.raw_user_meta_data ->> 'full_name', -- Extract full_name
    (NEW.raw_user_meta_data ->> 'user_type')::text, -- Extract user_type
    NEW.id::text                    -- Use the user's UUID (as text) for the username initially
    -- Note: 'created_at', 'balance', 'language' have defaults in your schema.
    -- 'avatar_url' and 'bio' are nullable.
  );
  RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."handle_new_user"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."set_default_balance"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
    IF NEW.user_type = 'buyer' THEN
        NEW.balance := 10000;
    ELSE
        NEW.balance := 0;
    END IF;
    RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."set_default_balance"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."update_updated_at_column"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."update_updated_at_column"() OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."chats" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "buyer_id" "text" NOT NULL,
    "seller_id" "text" NOT NULL,
    "contract_id" "uuid"
);


ALTER TABLE "public"."chats" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."contract_milestones" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "contract_id" "uuid" NOT NULL,
    "description" "text" NOT NULL,
    "due_date" timestamp with time zone,
    "amount" numeric,
    "status" "text" DEFAULT 'pending'::"text" NOT NULL,
    "sequence" integer DEFAULT 1 NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    CONSTRAINT "contract_milestones_status_check" CHECK (("status" = ANY (ARRAY['pending'::"text", 'approved'::"text", 'rejected'::"text", 'paid'::"text"])))
);


ALTER TABLE "public"."contract_milestones" OWNER TO "postgres";


COMMENT ON TABLE "public"."contract_milestones" IS 'Stores individual milestones associated with a contract, typically used for installment payments.';



COMMENT ON COLUMN "public"."contract_milestones"."contract_id" IS 'Foreign key linking to the contracts table.';



COMMENT ON COLUMN "public"."contract_milestones"."description" IS 'Details of what needs to be achieved for this milestone.';



COMMENT ON COLUMN "public"."contract_milestones"."due_date" IS 'Optional target date for milestone completion.';



COMMENT ON COLUMN "public"."contract_milestones"."amount" IS 'Payment amount associated with completing this specific milestone.';



COMMENT ON COLUMN "public"."contract_milestones"."status" IS 'Current status of the milestone.';



COMMENT ON COLUMN "public"."contract_milestones"."sequence" IS 'Order/sequence number for this milestone within the contract.';



CREATE TABLE IF NOT EXISTS "public"."contracts" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "buyer_id" "text" NOT NULL,
    "seller_id" "text" NOT NULL,
    "job_id" "uuid",
    "service_id" "uuid",
    "status" "text" DEFAULT 'pending'::"text",
    "amount" numeric NOT NULL,
    "description" "text" NOT NULL,
    "attachments" "jsonb",
    "currency" "text",
    "contract_type" "text",
    "title" "text",
    CONSTRAINT "contracts_status_check" CHECK (("status" = ANY (ARRAY['pending'::"text", 'accepted'::"text", 'rejected'::"text", 'completed'::"text"])))
);


ALTER TABLE "public"."contracts" OWNER TO "postgres";


COMMENT ON COLUMN "public"."contracts"."attachments" IS 'Stores an array of attachment objects, each with file_url, file_name, file_size.';



CREATE TABLE IF NOT EXISTS "public"."job_applications" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "job_id" "uuid" NOT NULL,
    "seller_id" "text" NOT NULL,
    "status" "text" DEFAULT 'pending'::"text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL,
    CONSTRAINT "job_applications_status_check" CHECK (("status" = ANY (ARRAY['pending'::"text", 'accepted'::"text", 'rejected'::"text"])))
);


ALTER TABLE "public"."job_applications" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."jobs" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "title" "text" NOT NULL,
    "budget" numeric NOT NULL,
    "buyer_id" "text" NOT NULL,
    "status" "text" DEFAULT 'open'::"text",
    "currency" "text" DEFAULT 'USD'::"text" NOT NULL,
    "deadline" "date",
    "negotiate_budget" boolean DEFAULT false NOT NULL,
    "usage_option" "text" DEFAULT 'private'::"text" NOT NULL,
    "privacy_option" "text" DEFAULT 'public'::"text" NOT NULL,
    "skill_levels" "text"[] DEFAULT '{}'::"text"[],
    "candidate_sources" "text"[] DEFAULT '{}'::"text"[],
    "files" "jsonb" DEFAULT '[]'::"jsonb",
    "description" "text",
    CONSTRAINT "jobs_privacy_option_check" CHECK (("privacy_option" = ANY (ARRAY['public'::"text", 'private'::"text"]))),
    CONSTRAINT "jobs_status_check" CHECK (("status" = ANY (ARRAY['open'::"text", 'in_progress'::"text", 'completed'::"text"]))),
    CONSTRAINT "jobs_usage_option_check" CHECK (("usage_option" = ANY (ARRAY['private'::"text", 'business'::"text"])))
);


ALTER TABLE "public"."jobs" OWNER TO "postgres";


COMMENT ON COLUMN "public"."jobs"."currency" IS 'Currency code for the budget (e.g., USD).';



COMMENT ON COLUMN "public"."jobs"."deadline" IS 'Optional deadline for the job completion.';



COMMENT ON COLUMN "public"."jobs"."negotiate_budget" IS 'Indicates if the budget is negotiable.';



COMMENT ON COLUMN "public"."jobs"."usage_option" IS 'Specifies if the job is for private or business use.';



COMMENT ON COLUMN "public"."jobs"."privacy_option" IS 'Specifies if the job posting is public or private.';



CREATE TABLE IF NOT EXISTS "public"."messages" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "chat_id" "uuid" NOT NULL,
    "sender_id" "text" NOT NULL,
    "content" "text" NOT NULL,
    "read" boolean DEFAULT false,
    "message_type" "text",
    "data" "jsonb"
);


ALTER TABLE "public"."messages" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."services" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "title" "text" NOT NULL,
    "description" "text" NOT NULL,
    "price" numeric NOT NULL,
    "seller_id" "text" NOT NULL,
    "audio_url" "text",
    "tags" "text"[] DEFAULT '{}'::"text"[],
    "lead_time" integer DEFAULT 7 NOT NULL,
    "includes" "text"[] DEFAULT '{}'::"text"[],
    "currency" "text" DEFAULT 'CNY'::"text" NOT NULL,
    "images" "jsonb" DEFAULT '[]'::"jsonb",
    "additional_services" "jsonb"
);


ALTER TABLE "public"."services" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."users" (
    "id" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "username" "text" NOT NULL,
    "full_name" "text" NOT NULL,
    "avatar_url" "text",
    "bio" "text",
    "user_type" "text" NOT NULL,
    "balance" numeric DEFAULT 1000,
    "language" "text" DEFAULT 'zh'::"text",
    "profile_tags" "text"[],
    "music_data" "jsonb",
    CONSTRAINT "users_balance_check" CHECK (("balance" >= (0)::numeric)),
    CONSTRAINT "users_language_check" CHECK (("language" = ANY (ARRAY['en'::"text", 'zh'::"text"]))),
    CONSTRAINT "users_user_type_check" CHECK (("user_type" = ANY (ARRAY['buyer'::"text", 'seller'::"text"])))
);


ALTER TABLE "public"."users" OWNER TO "postgres";


ALTER TABLE ONLY "public"."chats"
    ADD CONSTRAINT "chats_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."contract_milestones"
    ADD CONSTRAINT "contract_milestones_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."contracts"
    ADD CONSTRAINT "contracts_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."job_applications"
    ADD CONSTRAINT "job_applications_job_id_seller_id_key" UNIQUE ("job_id", "seller_id");



ALTER TABLE ONLY "public"."job_applications"
    ADD CONSTRAINT "job_applications_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."jobs"
    ADD CONSTRAINT "jobs_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."messages"
    ADD CONSTRAINT "messages_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."services"
    ADD CONSTRAINT "services_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_username_key" UNIQUE ("username");



CREATE INDEX "idx_contract_milestones_contract_id_sequence" ON "public"."contract_milestones" USING "btree" ("contract_id", "sequence");



CREATE OR REPLACE TRIGGER "set_default_balance_trigger" BEFORE INSERT ON "public"."users" FOR EACH ROW EXECUTE FUNCTION "public"."set_default_balance"();



CREATE OR REPLACE TRIGGER "update_job_applications_updated_at" BEFORE UPDATE ON "public"."job_applications" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



ALTER TABLE ONLY "public"."chats"
    ADD CONSTRAINT "chats_buyer_id_fkey" FOREIGN KEY ("buyer_id") REFERENCES "public"."users"("id");



ALTER TABLE ONLY "public"."chats"
    ADD CONSTRAINT "chats_contract_id_fkey" FOREIGN KEY ("contract_id") REFERENCES "public"."contracts"("id");



ALTER TABLE ONLY "public"."chats"
    ADD CONSTRAINT "chats_seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "public"."users"("id");



ALTER TABLE ONLY "public"."contract_milestones"
    ADD CONSTRAINT "contract_milestones_contract_id_fkey" FOREIGN KEY ("contract_id") REFERENCES "public"."contracts"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."contracts"
    ADD CONSTRAINT "contracts_buyer_id_fkey" FOREIGN KEY ("buyer_id") REFERENCES "public"."users"("id");



ALTER TABLE ONLY "public"."contracts"
    ADD CONSTRAINT "contracts_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "public"."jobs"("id");



ALTER TABLE ONLY "public"."contracts"
    ADD CONSTRAINT "contracts_seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "public"."users"("id");



ALTER TABLE ONLY "public"."contracts"
    ADD CONSTRAINT "contracts_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "public"."services"("id");



ALTER TABLE ONLY "public"."job_applications"
    ADD CONSTRAINT "job_applications_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "public"."jobs"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."job_applications"
    ADD CONSTRAINT "job_applications_seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "public"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."jobs"
    ADD CONSTRAINT "jobs_buyer_id_fkey" FOREIGN KEY ("buyer_id") REFERENCES "public"."users"("id");



ALTER TABLE ONLY "public"."messages"
    ADD CONSTRAINT "messages_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "public"."chats"("id");



ALTER TABLE ONLY "public"."messages"
    ADD CONSTRAINT "messages_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "public"."users"("id");



ALTER TABLE ONLY "public"."services"
    ADD CONSTRAINT "services_seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "public"."users"("id");



CREATE POLICY "Allow authenticated read access" ON "public"."contract_milestones" FOR SELECT USING (("auth"."role"() = 'authenticated'::"text"));



CREATE POLICY "Allow delete access for involved users" ON "public"."contract_milestones" FOR DELETE USING ((EXISTS ( SELECT 1
   FROM "public"."contracts" "c"
  WHERE (("c"."id" = "contract_milestones"."contract_id") AND (("c"."buyer_id" = ("auth"."uid"())::"text") OR ("c"."seller_id" = ("auth"."uid"())::"text"))))));



CREATE POLICY "Allow delete for buyers of parent contract" ON "public"."contract_milestones" FOR DELETE USING ((("auth"."role"() = 'authenticated'::"text") AND ("contract_id" IN ( SELECT "contracts"."id"
   FROM "public"."contracts"
  WHERE ("contracts"."buyer_id" = ("auth"."uid"())::"text")))));



CREATE POLICY "Allow insert access for involved users" ON "public"."contract_milestones" FOR INSERT WITH CHECK ((EXISTS ( SELECT 1
   FROM "public"."contracts" "c"
  WHERE (("c"."id" = "contract_milestones"."contract_id") AND (("c"."buyer_id" = ("auth"."uid"())::"text") OR ("c"."seller_id" = ("auth"."uid"())::"text"))))));



CREATE POLICY "Allow insert for authenticated buyers" ON "public"."contracts" FOR INSERT WITH CHECK ((("auth"."role"() = 'authenticated'::"text") AND ("buyer_id" = ("auth"."uid"())::"text")));



CREATE POLICY "Allow insert for buyers" ON "public"."jobs" FOR INSERT WITH CHECK ((("auth"."role"() = 'authenticated'::"text") AND ("buyer_id" = ("auth"."uid"())::"text")));



CREATE POLICY "Allow insert for buyers of parent contract" ON "public"."contract_milestones" FOR INSERT WITH CHECK ((("auth"."role"() = 'authenticated'::"text") AND ("contract_id" IN ( SELECT "contracts"."id"
   FROM "public"."contracts"
  WHERE ("contracts"."buyer_id" = ("auth"."uid"())::"text")))));



CREATE POLICY "Allow public delete to chats" ON "public"."chats" FOR DELETE USING (true);



CREATE POLICY "Allow public delete to contracts" ON "public"."contracts" FOR DELETE USING (true);



CREATE POLICY "Allow public delete to jobs" ON "public"."jobs" FOR DELETE USING (true);



CREATE POLICY "Allow public delete to messages" ON "public"."messages" FOR DELETE USING (true);



CREATE POLICY "Allow public delete to services" ON "public"."services" FOR DELETE USING (true);



CREATE POLICY "Allow public delete to users" ON "public"."users" FOR DELETE USING (true);



CREATE POLICY "Allow public insert to chats" ON "public"."chats" FOR INSERT WITH CHECK (true);



CREATE POLICY "Allow public insert to contracts" ON "public"."contracts" FOR INSERT WITH CHECK (true);



CREATE POLICY "Allow public insert to jobs" ON "public"."jobs" FOR INSERT WITH CHECK (true);



CREATE POLICY "Allow public insert to messages" ON "public"."messages" FOR INSERT WITH CHECK (true);



CREATE POLICY "Allow public insert to services" ON "public"."services" FOR INSERT WITH CHECK (true);



CREATE POLICY "Allow public insert to users" ON "public"."users" FOR INSERT WITH CHECK (true);



CREATE POLICY "Allow public read access" ON "public"."contract_milestones" FOR SELECT USING (true);



CREATE POLICY "Allow public read access to chats" ON "public"."chats" FOR SELECT USING (true);



CREATE POLICY "Allow public read access to contracts" ON "public"."contracts" FOR SELECT USING (true);



CREATE POLICY "Allow public read access to jobs" ON "public"."jobs" FOR SELECT USING (true);



CREATE POLICY "Allow public read access to messages" ON "public"."messages" FOR SELECT USING (true);



CREATE POLICY "Allow public read access to services" ON "public"."services" FOR SELECT USING (true);



CREATE POLICY "Allow public read access to users" ON "public"."users" FOR SELECT USING (true);



CREATE POLICY "Allow public update to chats" ON "public"."chats" FOR UPDATE USING (true);



CREATE POLICY "Allow public update to contracts" ON "public"."contracts" FOR UPDATE USING (true);



CREATE POLICY "Allow public update to jobs" ON "public"."jobs" FOR UPDATE USING (true);



CREATE POLICY "Allow public update to messages" ON "public"."messages" FOR UPDATE USING (true);



CREATE POLICY "Allow public update to services" ON "public"."services" FOR UPDATE USING (true);



CREATE POLICY "Allow public update to users" ON "public"."users" FOR UPDATE USING (true);



CREATE POLICY "Allow read access to involved users" ON "public"."contract_milestones" FOR SELECT USING ((EXISTS ( SELECT 1
   FROM "public"."contracts" "c"
  WHERE (("c"."id" = "contract_milestones"."contract_id") AND (("c"."buyer_id" = ("auth"."uid"())::"text") OR ("c"."seller_id" = ("auth"."uid"())::"text"))))));



CREATE POLICY "Allow select for authenticated buyers and sellers" ON "public"."contracts" FOR SELECT USING ((("auth"."role"() = 'authenticated'::"text") AND (("buyer_id" = ("auth"."uid"())::"text") OR ("seller_id" = ("auth"."uid"())::"text"))));



CREATE POLICY "Allow select for authenticated users" ON "public"."users" FOR SELECT USING (("auth"."role"() = 'authenticated'::"text"));



CREATE POLICY "Allow select for involved users" ON "public"."jobs" FOR SELECT USING ((("auth"."role"() = 'authenticated'::"text") AND (("buyer_id" = ("auth"."uid"())::"text") OR ("id" IN ( SELECT "contracts"."job_id"
   FROM "public"."contracts"
  WHERE (("contracts"."seller_id" = ("auth"."uid"())::"text") AND ("contracts"."job_id" IS NOT NULL)))))));



CREATE POLICY "Allow select for users involved in parent contract" ON "public"."contract_milestones" FOR SELECT USING ((("auth"."role"() = 'authenticated'::"text") AND ("contract_id" IN ( SELECT "contracts"."id"
   FROM "public"."contracts"
  WHERE (("contracts"."buyer_id" = ("auth"."uid"())::"text") OR ("contracts"."seller_id" = ("auth"."uid"())::"text"))))));



CREATE POLICY "Allow update access for involved users" ON "public"."contract_milestones" FOR UPDATE USING ((EXISTS ( SELECT 1
   FROM "public"."contracts" "c"
  WHERE (("c"."id" = "contract_milestones"."contract_id") AND (("c"."buyer_id" = ("auth"."uid"())::"text") OR ("c"."seller_id" = ("auth"."uid"())::"text"))))));



CREATE POLICY "Allow update for authenticated buyers and sellers" ON "public"."contracts" FOR UPDATE USING ((("auth"."role"() = 'authenticated'::"text") AND (("buyer_id" = ("auth"."uid"())::"text") OR ("seller_id" = ("auth"."uid"())::"text"))));



CREATE POLICY "Allow update for buyers on own jobs" ON "public"."jobs" FOR UPDATE USING ((("auth"."role"() = 'authenticated'::"text") AND ("buyer_id" = ("auth"."uid"())::"text")));



CREATE POLICY "Allow update for own profile" ON "public"."users" FOR UPDATE USING ((("auth"."role"() = 'authenticated'::"text") AND ("id" = ("auth"."uid"())::"text"))) WITH CHECK (("id" = ("auth"."uid"())::"text"));



CREATE POLICY "Allow update for users involved in parent contract" ON "public"."contract_milestones" FOR UPDATE USING ((("auth"."role"() = 'authenticated'::"text") AND ("contract_id" IN ( SELECT "contracts"."id"
   FROM "public"."contracts"
  WHERE (("contracts"."buyer_id" = ("auth"."uid"())::"text") OR ("contracts"."seller_id" = ("auth"."uid"())::"text"))))));



CREATE POLICY "Allow users to read messages in their chats" ON "public"."messages" FOR SELECT USING ((EXISTS ( SELECT 1
   FROM "public"."chats"
  WHERE (("chats"."id" = "messages"."chat_id") AND (("chats"."buyer_id" = ("auth"."uid"())::"text") OR ("chats"."seller_id" = ("auth"."uid"())::"text"))))));



CREATE POLICY "allow_buyer_update" ON "public"."contract_milestones" FOR UPDATE USING ((EXISTS ( SELECT 1
   FROM "public"."contracts" "c"
  WHERE (("c"."id" = "contract_milestones"."contract_id") AND ("c"."buyer_id" = ("auth"."uid"())::"text")))));



CREATE POLICY "allow_contract_participants_insert" ON "public"."contract_milestones" FOR INSERT WITH CHECK ((EXISTS ( SELECT 1
   FROM "public"."contracts" "c"
  WHERE (("c"."id" = "contract_milestones"."contract_id") AND (("c"."buyer_id" = ("auth"."uid"())::"text") OR ("c"."seller_id" = ("auth"."uid"())::"text"))))));



CREATE POLICY "allow_contract_participants_select" ON "public"."contract_milestones" FOR SELECT USING ((EXISTS ( SELECT 1
   FROM "public"."contracts" "c"
  WHERE (("c"."id" = "contract_milestones"."contract_id") AND (("c"."buyer_id" = ("auth"."uid"())::"text") OR ("c"."seller_id" = ("auth"."uid"())::"text"))))));



ALTER TABLE "public"."chats" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."contracts" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."jobs" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."messages" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."services" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."users" ENABLE ROW LEVEL SECURITY;




ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";






ALTER PUBLICATION "supabase_realtime" ADD TABLE ONLY "public"."messages";



GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";











































































































































































GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "service_role";



GRANT ALL ON FUNCTION "public"."set_default_balance"() TO "anon";
GRANT ALL ON FUNCTION "public"."set_default_balance"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."set_default_balance"() TO "service_role";



GRANT ALL ON FUNCTION "public"."update_updated_at_column"() TO "anon";
GRANT ALL ON FUNCTION "public"."update_updated_at_column"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_updated_at_column"() TO "service_role";


















GRANT ALL ON TABLE "public"."chats" TO "anon";
GRANT ALL ON TABLE "public"."chats" TO "authenticated";
GRANT ALL ON TABLE "public"."chats" TO "service_role";



GRANT ALL ON TABLE "public"."contract_milestones" TO "anon";
GRANT ALL ON TABLE "public"."contract_milestones" TO "authenticated";
GRANT ALL ON TABLE "public"."contract_milestones" TO "service_role";



GRANT ALL ON TABLE "public"."contracts" TO "anon";
GRANT ALL ON TABLE "public"."contracts" TO "authenticated";
GRANT ALL ON TABLE "public"."contracts" TO "service_role";



GRANT ALL ON TABLE "public"."job_applications" TO "anon";
GRANT ALL ON TABLE "public"."job_applications" TO "authenticated";
GRANT ALL ON TABLE "public"."job_applications" TO "service_role";



GRANT ALL ON TABLE "public"."jobs" TO "anon";
GRANT ALL ON TABLE "public"."jobs" TO "authenticated";
GRANT ALL ON TABLE "public"."jobs" TO "service_role";



GRANT ALL ON TABLE "public"."messages" TO "anon";
GRANT ALL ON TABLE "public"."messages" TO "authenticated";
GRANT ALL ON TABLE "public"."messages" TO "service_role";



GRANT ALL ON TABLE "public"."services" TO "anon";
GRANT ALL ON TABLE "public"."services" TO "authenticated";
GRANT ALL ON TABLE "public"."services" TO "service_role";



GRANT ALL ON TABLE "public"."users" TO "anon";
GRANT ALL ON TABLE "public"."users" TO "authenticated";
GRANT ALL ON TABLE "public"."users" TO "service_role";









ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";

























CREATE OR REPLACE TRIGGER "on_auth_user_created" AFTER INSERT ON "auth"."users" FOR EACH ROW EXECUTE FUNCTION "public"."handle_new_user"();





RESET ALL;


