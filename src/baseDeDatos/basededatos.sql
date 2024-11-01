--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.0

-- Started on 2024-11-01 12:23:43

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

--
-- TOC entry 2 (class 3079 OID 16384)
-- Name: adminpack; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS adminpack WITH SCHEMA pg_catalog;


--
-- TOC entry 4823 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION adminpack; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION adminpack IS 'administrative functions for PostgreSQL';


--
-- TOC entry 223 (class 1255 OID 16398)
-- Name: create_invoice(text, numeric, date); Type: PROCEDURE; Schema: public; Owner: postgres
--

CREATE PROCEDURE public.create_invoice(IN customer_name text, IN total_amount numeric, IN invoice_date date)
    LANGUAGE plpgsql
    AS $$
BEGIN
    INSERT INTO invoices (customer_name, total_amount, invoice_date)
    VALUES ( customer_nameM total_amount, invoice_date)
END;
$$;


ALTER PROCEDURE public.create_invoice(IN customer_name text, IN total_amount numeric, IN invoice_date date) OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 216 (class 1259 OID 16399)
-- Name: Area; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Area" (
    "Id" integer NOT NULL,
    "Especialidad" text NOT NULL,
    "TiempoEspera" integer NOT NULL
);


ALTER TABLE public."Area" OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16404)
-- Name: CambioEstado; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."CambioEstado" (
    "Id" integer NOT NULL,
    "CambioEstado" character varying NOT NULL,
    "idEstadoTurno" integer NOT NULL
);


ALTER TABLE public."CambioEstado" OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 16409)
-- Name: EstadoTurno; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."EstadoTurno" (
    "Id" integer NOT NULL,
    "Descripcion" text NOT NULL
);


ALTER TABLE public."EstadoTurno" OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16414)
-- Name: Medico; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Medico" (
    "Id" integer NOT NULL,
    "Nombre" character varying NOT NULL,
    "Apellido" character varying NOT NULL,
    "DNI" text NOT NULL,
    "Gmail" text NOT NULL,
    "Telefono" text NOT NULL,
    "Foto" text,
    "idArea" integer NOT NULL
);


ALTER TABLE public."Medico" OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 16419)
-- Name: Paciente; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Paciente" (
    "Nombre" character varying NOT NULL,
    "Apellido" character varying NOT NULL,
    "DNI" text NOT NULL,
    "Gmail" text NOT NULL,
    "ObraSocial" text NOT NULL,
    "Contraseña" character varying NOT NULL,
    "Telefono" text NOT NULL,
    "Foto" text
);


ALTER TABLE public."Paciente" OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16424)
-- Name: Turno; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Turno" (
    "Id" integer NOT NULL,
    "idMedico" integer,
    "idPaciente" integer NOT NULL,
    "idArea" integer NOT NULL,
    "idEstadoTurno" integer NOT NULL,
    "FechaHora" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "Sintomas" text NOT NULL
);


ALTER TABLE public."Turno" OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 16430)
-- Name: Turno_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Turno_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Turno_Id_seq" OWNER TO postgres;

--
-- TOC entry 4824 (class 0 OID 0)
-- Dependencies: 222
-- Name: Turno_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Turno_Id_seq" OWNED BY public."Turno"."Id";


--
-- TOC entry 4656 (class 2604 OID 16431)
-- Name: Turno Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Turno" ALTER COLUMN "Id" SET DEFAULT nextval('public."Turno_Id_seq"'::regclass);


--
-- TOC entry 4811 (class 0 OID 16399)
-- Dependencies: 216
-- Data for Name: Area; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Area" VALUES (1, 'Cardiología', 30);
INSERT INTO public."Area" VALUES (2, 'Neurología', 20);
INSERT INTO public."Area" VALUES (3, 'Pediatría', 25);


--
-- TOC entry 4812 (class 0 OID 16404)
-- Dependencies: 217
-- Data for Name: CambioEstado; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 4813 (class 0 OID 16409)
-- Dependencies: 218
-- Data for Name: EstadoTurno; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."EstadoTurno" VALUES (1, 'En espera');
INSERT INTO public."EstadoTurno" VALUES (2, 'Atendiendo');
INSERT INTO public."EstadoTurno" VALUES (3, 'Finalizado');


--
-- TOC entry 4814 (class 0 OID 16414)
-- Dependencies: 219
-- Data for Name: Medico; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Medico" VALUES (1, 'Juan', 'Pérez', '12345678A', 'juan.perez@gmail.com', '123-456-7890', 'foto1.jpg', 1);
INSERT INTO public."Medico" VALUES (2, 'Ana', 'García', '23456789B', 'ana.garcia@gmail.com', '123-456-7891', 'foto2.jpg', 2);
INSERT INTO public."Medico" VALUES (3, 'Luis', 'Martínez', '34567890C', 'luis.martinez@gmail.com', '123-456-7892', 'foto3.jpg', 1);


--
-- TOC entry 4815 (class 0 OID 16419)
-- Dependencies: 220
-- Data for Name: Paciente; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 4816 (class 0 OID 16424)
-- Dependencies: 221
-- Data for Name: Turno; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Turno" VALUES (2, 2, 2, 2, 1, '2024-09-17 07:00:00-03', 'Dolor en el pecho');
INSERT INTO public."Turno" VALUES (6, 3, 2, 2, 1, '2024-09-16 08:45:53.963721-03', 'Cada vez que me tocan la cabeza siento cosquillas en los pies');
INSERT INTO public."Turno" VALUES (7, 2, 3, 3, 2, '2024-09-16 08:49:30.492839-03', 'Mocos y dolor de garganta');


--
-- TOC entry 4825 (class 0 OID 0)
-- Dependencies: 222
-- Name: Turno_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Turno_Id_seq"', 28, true);


--
-- TOC entry 4659 (class 2606 OID 16433)
-- Name: Area Area_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Area"
    ADD CONSTRAINT "Area_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 4661 (class 2606 OID 16435)
-- Name: CambioEstado CambioEstado_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CambioEstado"
    ADD CONSTRAINT "CambioEstado_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 4663 (class 2606 OID 16437)
-- Name: EstadoTurno EstadoTurno_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."EstadoTurno"
    ADD CONSTRAINT "EstadoTurno_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 4665 (class 2606 OID 16439)
-- Name: Medico Medico_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Medico"
    ADD CONSTRAINT "Medico_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 4667 (class 2606 OID 16443)
-- Name: Turno Turno_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Turno"
    ADD CONSTRAINT "Turno_pkey" PRIMARY KEY ("Id");


-- Completed on 2024-11-01 12:23:43

--
-- PostgreSQL database dump complete
--

