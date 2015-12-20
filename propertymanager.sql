--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner:
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner:
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: month; Type: TABLE; Schema: public; Owner: postgres; Tablespace:
--

CREATE TABLE month (
    month_id integer NOT NULL,
    name character varying(100)
);


ALTER TABLE month OWNER TO postgres;

--
-- Name: payment; Type: TABLE; Schema: public; Owner: postgres; Tablespace:
--

CREATE TABLE payment (
    payment_id integer NOT NULL,
    amount numeric(8,2),
    pay_date date,
    month_id integer
);


ALTER TABLE payment OWNER TO postgres;

--
-- Name: payment_payment_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE payment_payment_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE payment_payment_id_seq OWNER TO postgres;

--
-- Name: payment_payment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE payment_payment_id_seq OWNED BY payment.payment_id;


--
-- Name: prop_pay; Type: TABLE; Schema: public; Owner: postgres; Tablespace:
--

CREATE TABLE prop_pay (
    prop_pay_id integer NOT NULL,
    property_id integer,
    payment_id integer,
    tenant_id integer
);


ALTER TABLE prop_pay OWNER TO postgres;

--
-- Name: prop_pay_prop_pay_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE prop_pay_prop_pay_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE prop_pay_prop_pay_id_seq OWNER TO postgres;

--
-- Name: prop_pay_prop_pay_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE prop_pay_prop_pay_id_seq OWNED BY prop_pay.prop_pay_id;


--
-- Name: property; Type: TABLE; Schema: public; Owner: postgres; Tablespace:
--

CREATE TABLE property (
    property_id integer NOT NULL,
    area numeric(10,2),
    description text,
    streetname character varying(100),
    streetnumber character varying(5),
    floor integer,
    percentage numeric(6,2),
    construction_date date,
    tenant_id integer
);


ALTER TABLE property OWNER TO postgres;

--
-- Name: property_property_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE property_property_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE property_property_id_seq OWNER TO postgres;

--
-- Name: property_property_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE property_property_id_seq OWNED BY property.property_id;


--
-- Name: tenant; Type: TABLE; Schema: public; Owner: postgres; Tablespace:
--

CREATE TABLE tenant (
    tenant_id integer NOT NULL,
    first_name character varying(100),
    last_name character varying(100),
    afm character varying(20)
);


ALTER TABLE tenant OWNER TO postgres;

--
-- Name: tenant_tenant_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE tenant_tenant_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE tenant_tenant_id_seq OWNER TO postgres;

--
-- Name: tenant_tenant_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE tenant_tenant_id_seq OWNED BY tenant.tenant_id;


--
-- Name: payment_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY payment ALTER COLUMN payment_id SET DEFAULT nextval('payment_payment_id_seq'::regclass);


--
-- Name: prop_pay_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY prop_pay ALTER COLUMN prop_pay_id SET DEFAULT nextval('prop_pay_prop_pay_id_seq'::regclass);


--
-- Name: property_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY property ALTER COLUMN property_id SET DEFAULT nextval('property_property_id_seq'::regclass);


--
-- Name: tenant_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY tenant ALTER COLUMN tenant_id SET DEFAULT nextval('tenant_tenant_id_seq'::regclass);


--
-- Name: idx_property; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace:
--

ALTER TABLE ONLY property
    ADD CONSTRAINT idx_property UNIQUE (tenant_id);


--
-- Name: payment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace:
--

ALTER TABLE ONLY payment
    ADD CONSTRAINT payment_pkey PRIMARY KEY (payment_id);


--
-- Name: pk_month; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace:
--

ALTER TABLE ONLY month
    ADD CONSTRAINT pk_month PRIMARY KEY (month_id);


--
-- Name: prop_pay_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace:
--

ALTER TABLE ONLY prop_pay
    ADD CONSTRAINT prop_pay_pkey PRIMARY KEY (prop_pay_id);


--
-- Name: property_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace:
--

ALTER TABLE ONLY property
    ADD CONSTRAINT property_pkey PRIMARY KEY (property_id);


--
-- Name: tenant_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace:
--

ALTER TABLE ONLY tenant
    ADD CONSTRAINT tenant_pkey PRIMARY KEY (tenant_id);


--
-- Name: idx_payment; Type: INDEX; Schema: public; Owner: postgres; Tablespace:
--

CREATE INDEX idx_payment ON payment USING btree (month_id);


--
-- Name: idx_prop_pay; Type: INDEX; Schema: public; Owner: postgres; Tablespace:
--

CREATE INDEX idx_prop_pay ON prop_pay USING btree (property_id);


--
-- Name: idx_prop_pay_0; Type: INDEX; Schema: public; Owner: postgres; Tablespace:
--

CREATE INDEX idx_prop_pay_0 ON prop_pay USING btree (tenant_id);


--
-- Name: idx_prop_pay_1; Type: INDEX; Schema: public; Owner: postgres; Tablespace:
--

CREATE INDEX idx_prop_pay_1 ON prop_pay USING btree (payment_id);


--
-- Name: fk_payment; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY payment
    ADD CONSTRAINT fk_payment FOREIGN KEY (month_id) REFERENCES month(month_id);


--
-- Name: fk_prop_pay; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY prop_pay
    ADD CONSTRAINT fk_prop_pay FOREIGN KEY (property_id) REFERENCES property(property_id);


--
-- Name: fk_prop_pay_0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY prop_pay
    ADD CONSTRAINT fk_prop_pay_0 FOREIGN KEY (tenant_id) REFERENCES tenant(tenant_id);


--
-- Name: fk_prop_pay_1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY prop_pay
    ADD CONSTRAINT fk_prop_pay_1 FOREIGN KEY (payment_id) REFERENCES payment(payment_id);


--
-- Name: fk_property; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY property
    ADD CONSTRAINT fk_property FOREIGN KEY (tenant_id) REFERENCES tenant(tenant_id);


--
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--
