--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: OrderStatus; Type: TYPE; Schema: public; Owner: weedmax-db_owner
--

CREATE TYPE public."OrderStatus" AS ENUM (
    'PENDING',
    'PAID',
    'SHIPPED',
    'DELIVERED',
    'CANCELED'
);


ALTER TYPE public."OrderStatus" OWNER TO "weedmax-db_owner";

--
-- Name: Role; Type: TYPE; Schema: public; Owner: weedmax-db_owner
--

CREATE TYPE public."Role" AS ENUM (
    'ADMIN',
    'CLIENT'
);


ALTER TYPE public."Role" OWNER TO "weedmax-db_owner";

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Address; Type: TABLE; Schema: public; Owner: weedmax-db_owner
--

CREATE TABLE public."Address" (
    id text NOT NULL,
    "userId" text NOT NULL,
    street text NOT NULL,
    city text NOT NULL,
    "zipCode" text NOT NULL,
    country text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Address" OWNER TO "weedmax-db_owner";

--
-- Name: Category; Type: TABLE; Schema: public; Owner: weedmax-db_owner
--

CREATE TABLE public."Category" (
    id text NOT NULL,
    name text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Category" OWNER TO "weedmax-db_owner";

--
-- Name: Order; Type: TABLE; Schema: public; Owner: weedmax-db_owner
--

CREATE TABLE public."Order" (
    id text NOT NULL,
    "userId" text NOT NULL,
    total numeric(65,30) NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    status public."OrderStatus" DEFAULT 'PENDING'::public."OrderStatus" NOT NULL
);


ALTER TABLE public."Order" OWNER TO "weedmax-db_owner";

--
-- Name: OrderItem; Type: TABLE; Schema: public; Owner: weedmax-db_owner
--

CREATE TABLE public."OrderItem" (
    id text NOT NULL,
    "orderId" text NOT NULL,
    "productId" text NOT NULL,
    quantity integer NOT NULL,
    price numeric(65,30) NOT NULL
);


ALTER TABLE public."OrderItem" OWNER TO "weedmax-db_owner";

--
-- Name: Product; Type: TABLE; Schema: public; Owner: weedmax-db_owner
--

CREATE TABLE public."Product" (
    id text NOT NULL,
    name text NOT NULL,
    specs text[],
    description text NOT NULL,
    stock integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "categoryId" text NOT NULL,
    images jsonb NOT NULL
);


ALTER TABLE public."Product" OWNER TO "weedmax-db_owner";

--
-- Name: ProductVariant; Type: TABLE; Schema: public; Owner: weedmax-db_owner
--

CREATE TABLE public."ProductVariant" (
    id text NOT NULL,
    "productId" text NOT NULL,
    quantity integer NOT NULL,
    price numeric(65,30) NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."ProductVariant" OWNER TO "weedmax-db_owner";

--
-- Name: User; Type: TABLE; Schema: public; Owner: weedmax-db_owner
--

CREATE TABLE public."User" (
    id text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    role public."Role" DEFAULT 'CLIENT'::public."Role" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "phoneNumber" text,
    "dateOfBirth" timestamp(3) without time zone NOT NULL,
    "emailVerificationToken" text,
    "emailVerified" timestamp(3) without time zone,
    firstname text NOT NULL,
    lastname text NOT NULL
);


ALTER TABLE public."User" OWNER TO "weedmax-db_owner";

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: weedmax-db_owner
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO "weedmax-db_owner";

--
-- Data for Name: Address; Type: TABLE DATA; Schema: public; Owner: weedmax-db_owner
--

COPY public."Address" (id, "userId", street, city, "zipCode", country, "createdAt", "updatedAt") FROM stdin;
9e717330-bff0-4778-a843-7210e778265a	8c69ed82-7e6a-4c6f-b75b-197c06264f23				France	2025-03-30 08:09:07.799	2025-03-30 08:09:07.799
f82d4a4d-6397-4bca-95e5-a15ff2c7e84c	79c01b8d-5866-4f9e-b082-d1cf9b684984	122 grande rue	Buchy	76750	France	2025-03-30 08:28:19.606	2025-03-30 09:11:57.46
\.


--
-- Data for Name: Category; Type: TABLE DATA; Schema: public; Owner: weedmax-db_owner
--

COPY public."Category" (id, name, "createdAt", "updatedAt") FROM stdin;
51369c51-30f8-493a-b201-f19f96291294	Fleurs	2025-03-30 08:39:08.75	2025-03-30 08:39:08.75
7905e2d6-6999-460b-8d43-3e5578ae8b26	Résines	2025-03-30 08:39:12.802	2025-03-30 08:39:12.802
2039054d-598b-48bb-9675-5bbaabcace6e	Huiles CBD	2025-03-30 08:39:18.826	2025-03-30 08:39:18.826
1e7fc54b-f5f9-4562-88df-62dc867d10bf	Vapes	2025-03-30 08:39:23.277	2025-03-30 08:39:23.277
98b9fde0-2d94-4328-af5c-56255978120f	Promos	2025-03-30 08:39:36.471	2025-03-30 08:39:36.471
\.


--
-- Data for Name: Order; Type: TABLE DATA; Schema: public; Owner: weedmax-db_owner
--

COPY public."Order" (id, "userId", total, "createdAt", "updatedAt", status) FROM stdin;
\.


--
-- Data for Name: OrderItem; Type: TABLE DATA; Schema: public; Owner: weedmax-db_owner
--

COPY public."OrderItem" (id, "orderId", "productId", quantity, price) FROM stdin;
\.


--
-- Data for Name: Product; Type: TABLE DATA; Schema: public; Owner: weedmax-db_owner
--

COPY public."Product" (id, name, specs, description, stock, "createdAt", "updatedAt", "categoryId", images) FROM stdin;
d9b23abf-a2bc-4d95-8f0f-c11584852480	Lemon Haze CBD	{"Variété: CBD Amnesia","Taux CBD: 3/5","Taux THC: < 0.2%"}	La fleur de CBD Lemon Haze est très populaire en France et dans le monde ❤. La Lemon Haze est une hybride entre la prestigieuse Silver Haze et la célèbre Lemon kush. Cette variété de chanvre offre de sublimes effluves de citrons mûrs fraîchement pelés. Notre Lemon Haze CBD révèle également des légères notes de pamplemousse, et cela pour le plus grand bonheur des afficionados d'agrumes. Vous retrouverez ces saveurs avec la CBD Amnesia et la Critical Haze.	10	2025-03-30 08:44:12.759	2025-03-30 08:44:12.759	51369c51-30f8-493a-b201-f19f96291294	[{"url": "https://res.cloudinary.com/dvemaowu3/image/upload/v1743324097/products/ujhppvo3nw4xp4is6pm2.webp", "public_id": "products/ujhppvo3nw4xp4is6pm2"}, {"url": "https://res.cloudinary.com/dvemaowu3/image/upload/v1743324098/products/m0kcwtnvbxralm1xwofc.webp", "public_id": "products/m0kcwtnvbxralm1xwofc"}]
e13e6336-4276-4b8d-8616-47462d44f948	Résine BZ10 CBD Afghan 60%	{"Saveur: chanvre, terreux","Dosage cannabinoïde: 60% (50% CBD / 10% Delta BZ10)","THC: < 0.3%"}	Laissez-vous séduire par la force envoûtante de la résine Delta BZ10 CBD Afghan 60%, qui dévoile de véritables arômes terreux et authentiques ❤. Acheter la résine BZ10 Afghan, c'est choisir une expérience de qualité supérieure et un moment de relaxation incomparable. Cette résine Delta BZ10 offre une relaxation optimale grâce à sa concentration élevée en CBD. Ce hash CBD 60 % est composé de pollen et de fleurs de chanvre, avec un taux naturel de 50% de CBD et 10% de Delta BZ10. Les terpènes naturels de la plante garantissent une expérience gustative authentique et savoureuse, tout en respectant la limite légale de 0,3 % de THC. Les saveurs sont intenses, et les effets puissants de ce hash CBD en font un allié parfait pour apaiser les troubles du sommeil, le stress et les douleurs chroniques. Cette résine CBD est totalement légale et autorisée à la vente en France.	3	2025-03-30 08:47:15.139	2025-03-30 08:47:15.139	7905e2d6-6999-460b-8d43-3e5578ae8b26	[{"url": "https://res.cloudinary.com/dvemaowu3/image/upload/v1743324317/products/ynarhg4d2xnhouh5dk6u.webp", "public_id": "products/ynarhg4d2xnhouh5dk6u"}]
43501933-550b-422b-8ae3-4accbd509665	Huile CBD Intense - Greeneo	{"Saveur: chanvre","Taux CBD: 5% / 10% / 20%","Garanti: sans THC","Flacon: 10 ml en verre opaque avec pipette compte-gouttes"}	L'huile CBD Intense Greeneo ❤ aura une action complète et globale pour améliorer votre bien-être. Composée de CBD, mais également de CBC, de CBN et de CBG, rarement une huile à spectre complet Greeneo pourra vous proposer cette grande variété de cannabinoïdes. Si le CBD commence à être connu pour ses effets relaxants et anti-inflammatoires, le CBC est particulièrement efficace par ses effets sédatifs, le CBG contre l'anxiété et enfin le CBN est réputé pour lutter contre l'insomnie. Si vous recherchez une huile CBD CBN CBG CBC Greeneo pour bénéficier de toutes les vertus du plant de chanvre, vous êtes au bon endroit !	10	2025-03-30 08:51:27.476	2025-03-30 08:51:27.476	2039054d-598b-48bb-9675-5bbaabcace6e	[{"url": "https://res.cloudinary.com/dvemaowu3/image/upload/v1743324572/products/sljyodoerutd1injdnz9.webp", "public_id": "products/sljyodoerutd1injdnz9"}]
e89487d5-8070-49ad-a8b0-c7a5b59f1e40	Kit feelin 2 - Nevoks	{"Puissance: 30W maximum, 3 réglages possibles","Autonomie: 1100mAh","Capacité: 3 ml","Cartouche compatibles: SPL 10","Compatibilité: e-loquide CBG / e-liquides avec 40% de VG max","Marque: Venoks"}	i vous recherchez une cigarette électronique pour CBD ou pour vaporiser un e liquide classique de vape, nous avons un pod qui sera idéal ! Le pod Feelin 2 Nevoks sera parfait si vous débutez dans le vapotage ou si vous recherchez un kit compact pour vos e-liquides au CBD. Son inhalation sera indirecte à directe restrictive selon la résistance utilisée. 	1	2025-03-30 08:54:33.32	2025-03-30 08:54:33.32	1e7fc54b-f5f9-4562-88df-62dc867d10bf	[{"url": "https://res.cloudinary.com/dvemaowu3/image/upload/v1743324750/products/atcrvelcttyes1n6sa38.webp", "public_id": "products/atcrvelcttyes1n6sa38"}]
18db6d75-24f6-46ec-82d3-7cc9f399a591	Ak-47 CBD	{"Saveurs: chanvre naturel et boisée","Culture: greenhouse","Dominance: Sativa","Puissance CBD: 4/5","THC: < 0.3%"}	La fleur de CBD sans THC AK-47 va ravir les sens des amateurs de saveurs de chanvre aux notes boisées. Nous conseillons sa consommation dans l'après-midi ou en soirée pour profiter des effets de cette weed sans THC sur votre créativité et votre bonne humeur. Acheter la fleur de chanvre sans thc AK-47 vous permettra de bénéficier d'une sensation de détente physique générale et diminuera votre stress. L'utilisation de l'AK-47 aura également un impact positif si vous souffrez d'anxiété, dépression ou encore d'insomnie grâce à sa dominance Sativa. Cette fleur AK-47 sans THC saura vous apporter une véritable sensation de relaxation ainsi qu'une stimulation accrue de votre créativité. L'AK-47 CBD agit en synergie sur votre corps et votre esprit afin de vous apporter une grande détente générale, une sensation de bien-être et un boost de votre humeur.	3	2025-03-30 09:10:07.758	2025-03-30 09:10:07.758	51369c51-30f8-493a-b201-f19f96291294	[{"url": "https://res.cloudinary.com/dvemaowu3/image/upload/v1743325704/products/a4ye0qxbklgpgyl85lfs.webp", "public_id": "products/a4ye0qxbklgpgyl85lfs"}]
\.


--
-- Data for Name: ProductVariant; Type: TABLE DATA; Schema: public; Owner: weedmax-db_owner
--

COPY public."ProductVariant" (id, "productId", quantity, price, "createdAt", "updatedAt") FROM stdin;
8ef31d1b-824d-4a75-83c5-cb1250097274	d9b23abf-a2bc-4d95-8f0f-c11584852480	1	3.450000000000000000000000000000	2025-03-30 08:44:12.759	2025-03-30 08:44:12.759
1a47b1df-0253-4aab-9d08-72a845bf6204	d9b23abf-a2bc-4d95-8f0f-c11584852480	3	9.750000000000000000000000000000	2025-03-30 08:44:12.759	2025-03-30 08:44:12.759
a9a6e4f8-ab3c-4637-945d-d23311d14aa4	d9b23abf-a2bc-4d95-8f0f-c11584852480	5	14.750000000000000000000000000000	2025-03-30 08:44:12.759	2025-03-30 08:44:12.759
618d95ad-6392-4003-8d6c-16f34e6bd409	d9b23abf-a2bc-4d95-8f0f-c11584852480	10	24.450000000000000000000000000000	2025-03-30 08:44:12.759	2025-03-30 08:44:12.759
bc604e60-c1a2-4e0d-9204-9b12cc93f6ea	d9b23abf-a2bc-4d95-8f0f-c11584852480	25	48.750000000000000000000000000000	2025-03-30 08:44:12.759	2025-03-30 08:44:12.759
548bb03b-f3b1-4590-91be-6eaea0bceee5	e13e6336-4276-4b8d-8616-47462d44f948	2	19.900000000000000000000000000000	2025-03-30 08:47:15.139	2025-03-30 08:47:15.139
e26e1d86-d4bf-4ead-86b7-0530217c2bae	e13e6336-4276-4b8d-8616-47462d44f948	5	44.900000000000000000000000000000	2025-03-30 08:47:15.139	2025-03-30 08:47:15.139
9d0abf84-31be-42fb-a799-9ee8c347dbe1	e13e6336-4276-4b8d-8616-47462d44f948	10	84.900000000000010000000000000000	2025-03-30 08:47:15.139	2025-03-30 08:47:15.139
732bc240-e5fb-46be-871f-8363ea6ba35b	43501933-550b-422b-8ae3-4accbd509665	500	39.900000000000000000000000000000	2025-03-30 08:51:27.476	2025-03-30 08:51:27.476
f1b3b880-c6c4-40a9-b532-e64ff78c29f7	43501933-550b-422b-8ae3-4accbd509665	1000	59.900000000000000000000000000000	2025-03-30 08:51:27.476	2025-03-30 08:51:27.476
e999a094-664f-496b-95b6-4f8ed67c6b09	43501933-550b-422b-8ae3-4accbd509665	2000	71.920000000000000000000000000000	2025-03-30 08:51:27.476	2025-03-30 08:51:27.476
58956497-bb3c-498a-8c03-84e22ffe4fd1	e89487d5-8070-49ad-a8b0-c7a5b59f1e40	1	21.900000000000000000000000000000	2025-03-30 08:54:33.32	2025-03-30 08:54:33.32
e63aa26d-d2b1-4e2b-8e70-b3cf0087c757	18db6d75-24f6-46ec-82d3-7cc9f399a591	1	3.450000000000000000000000000000	2025-03-30 09:10:07.758	2025-03-30 09:10:07.758
f63ec418-09bb-4a69-b921-275400ad5256	18db6d75-24f6-46ec-82d3-7cc9f399a591	3	9.750000000000000000000000000000	2025-03-30 09:10:07.758	2025-03-30 09:10:07.758
cee96c84-73b4-4b8e-aae8-4b2195254f5b	18db6d75-24f6-46ec-82d3-7cc9f399a591	5	14.750000000000000000000000000000	2025-03-30 09:10:07.758	2025-03-30 09:10:07.758
3e747910-08bf-476b-85de-98f7729120e4	18db6d75-24f6-46ec-82d3-7cc9f399a591	10	24.500000000000000000000000000000	2025-03-30 09:10:07.758	2025-03-30 09:10:07.758
71fc404d-7915-4905-ae0c-c5242651a099	18db6d75-24f6-46ec-82d3-7cc9f399a591	25	48.750000000000000000000000000000	2025-03-30 09:10:07.758	2025-03-30 09:10:07.758
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: weedmax-db_owner
--

COPY public."User" (id, email, password, role, "createdAt", "updatedAt", "phoneNumber", "dateOfBirth", "emailVerificationToken", "emailVerified", firstname, lastname) FROM stdin;
8c69ed82-7e6a-4c6f-b75b-197c06264f23	bouclet.florian@gmail.com	$2b$10$.Nudm/rOgelaYRg3AqTdZukPT6ms2kSZIkWO.L3.lysyuzjtWFvM6	ADMIN	2025-03-30 08:09:07.799	2025-03-30 08:09:07.799	0685992504	1994-01-07 00:00:00	42202f33-1b78-4673-bca3-5bc673040eb5	\N	Florian	Bouclet
79c01b8d-5866-4f9e-b082-d1cf9b684984	weedmaxcbd@gmail.com	$2b$10$hcBh4SoJrmSgmGxWxVWA/ugGrOuzWWwQLo31rGf2jHfvqYwV54Lsa	ADMIN	2025-03-30 08:28:19.606	2025-03-30 08:28:19.606	0235348003	1986-12-31 23:00:00	b4486de5-2743-42bb-a764-3753d5960d0e	\N	Alexandre	Lancien
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: weedmax-db_owner
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
befbfc2d-5c50-4adc-88bb-8ef48842f7d5	702a166bf3ac2f622e0df9a332613e61ba030f6b257bf7b2c28f98b34b49417f	2025-03-30 08:06:47.76358+00	20250211205852_init	\N	\N	2025-03-30 08:06:47.359532+00	1
3736a9b0-1d5d-4b18-8ca5-6bc2184e38ba	ba3d4842f958b995f806302aa8333f82f48eb065ea32b84504d46c603f24b656	2025-03-30 08:06:48.062527+00	20250303194957_update_user_schema	\N	\N	2025-03-30 08:06:47.971643+00	1
0f4fb7a8-6c8a-4147-9501-c86bb6827e65	ca48ef4363cba07dcbab0a44b37895baf08397da0e662752cce2e7ab0694c526	2025-03-30 08:06:48.379007+00	20250303215843_update_user_schema	\N	\N	2025-03-30 08:06:48.174526+00	1
415500d4-56cb-48af-a38e-b5312ef306e7	7640f7d7254f697c6ff2df6b3eb3c57cb4908d3e3b1acbfce66cb9d336a8dbd5	2025-03-30 08:06:49.095447+00	20250324193119_update_schema	\N	\N	2025-03-30 08:06:48.688688+00	1
216df428-0946-4818-a56c-e397e3fa4f80	7e2b31ac065e918baa79835aa87d038952b71050b4dfa98893fbf72a4d5e4e6b	2025-03-30 08:06:49.255591+00	20250326201608_edit_product_variants	\N	\N	2025-03-30 08:06:49.133642+00	1
c9c4c3e2-0a6c-48f0-bf1a-c83174ce6c48	72abf69e53150390c8435ed0c3da9b8f3825b53f233ed3986e56bb3425a70072	2025-03-30 08:06:49.607819+00	20250329142452_add_category_to_product	\N	\N	2025-03-30 08:06:49.407676+00	1
efa93b54-db08-40bc-bba9-2da357cc9ea4	531a46aebda09607879c63b5f7123a5cf48307025c926a8bbc9ad37bdee00e54	\N	20250401195235_add_slug_to_category	A migration failed to apply. New migrations cannot be applied before the error is recovered from. Read more about how to resolve migration issues in a production database: https://pris.ly/d/migrate-resolve\n\nMigration name: 20250401195235_add_slug_to_category\n\nDatabase error code: 23505\n\nDatabase error:\nERROR: could not create unique index "Category_slug_key"\nDETAIL: Key (slug)=() is duplicated.\n\nDbError { severity: "ERROR", parsed_severity: Some(Error), code: SqlState(E23505), message: "could not create unique index \\"Category_slug_key\\"", detail: Some("Key (slug)=() is duplicated."), hint: None, position: None, where_: None, schema: Some("public"), table: Some("Category"), column: None, datatype: None, constraint: Some("Category_slug_key"), file: Some("tuplesortvariants.c"), line: Some(1550), routine: Some("comparetup_index_btree_tiebreak") }\n\n   0: sql_schema_connector::apply_migration::apply_script\n           with migration_name="20250401195235_add_slug_to_category"\n             at schema-engine\\connectors\\sql-schema-connector\\src\\apply_migration.rs:106\n   1: schema_core::commands::apply_migrations::Applying migration\n           with migration_name="20250401195235_add_slug_to_category"\n             at schema-engine\\core\\src\\commands\\apply_migrations.rs:91\n   2: schema_core::state::ApplyMigrations\n             at schema-engine\\core\\src\\state.rs:225	2025-04-01 19:59:35.536498+00	2025-04-01 19:52:35.59667+00	0
5eab428a-b2e8-4e63-9b5b-4befc99346ce	c414d361d3057ab87694e69dadc72350a0d131b17eaf3ba88f9036cc5f3ed928	2025-04-01 19:59:35.74089+00	20250401195235_add_slug_to_category		\N	2025-04-01 19:59:35.74089+00	0
\.


--
-- Name: Address Address_pkey; Type: CONSTRAINT; Schema: public; Owner: weedmax-db_owner
--

ALTER TABLE ONLY public."Address"
    ADD CONSTRAINT "Address_pkey" PRIMARY KEY (id);


--
-- Name: Category Category_pkey; Type: CONSTRAINT; Schema: public; Owner: weedmax-db_owner
--

ALTER TABLE ONLY public."Category"
    ADD CONSTRAINT "Category_pkey" PRIMARY KEY (id);


--
-- Name: OrderItem OrderItem_pkey; Type: CONSTRAINT; Schema: public; Owner: weedmax-db_owner
--

ALTER TABLE ONLY public."OrderItem"
    ADD CONSTRAINT "OrderItem_pkey" PRIMARY KEY (id);


--
-- Name: Order Order_pkey; Type: CONSTRAINT; Schema: public; Owner: weedmax-db_owner
--

ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "Order_pkey" PRIMARY KEY (id);


--
-- Name: ProductVariant ProductVariant_pkey; Type: CONSTRAINT; Schema: public; Owner: weedmax-db_owner
--

ALTER TABLE ONLY public."ProductVariant"
    ADD CONSTRAINT "ProductVariant_pkey" PRIMARY KEY (id);


--
-- Name: Product Product_pkey; Type: CONSTRAINT; Schema: public; Owner: weedmax-db_owner
--

ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: weedmax-db_owner
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: weedmax-db_owner
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Category_name_key; Type: INDEX; Schema: public; Owner: weedmax-db_owner
--

CREATE UNIQUE INDEX "Category_name_key" ON public."Category" USING btree (name);


--
-- Name: User_emailVerificationToken_key; Type: INDEX; Schema: public; Owner: weedmax-db_owner
--

CREATE UNIQUE INDEX "User_emailVerificationToken_key" ON public."User" USING btree ("emailVerificationToken");


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: weedmax-db_owner
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: Address Address_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: weedmax-db_owner
--

ALTER TABLE ONLY public."Address"
    ADD CONSTRAINT "Address_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: OrderItem OrderItem_orderId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: weedmax-db_owner
--

ALTER TABLE ONLY public."OrderItem"
    ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES public."Order"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: OrderItem OrderItem_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: weedmax-db_owner
--

ALTER TABLE ONLY public."OrderItem"
    ADD CONSTRAINT "OrderItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES public."Product"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Order Order_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: weedmax-db_owner
--

ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ProductVariant ProductVariant_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: weedmax-db_owner
--

ALTER TABLE ONLY public."ProductVariant"
    ADD CONSTRAINT "ProductVariant_productId_fkey" FOREIGN KEY ("productId") REFERENCES public."Product"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Product Product_categoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: weedmax-db_owner
--

ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES public."Category"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO neon_superuser WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON TABLES TO neon_superuser WITH GRANT OPTION;


--
-- PostgreSQL database dump complete
--

