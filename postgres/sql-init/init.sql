
CREATE TABLE public.list_items (
	item_id SERIAL PRIMARY KEY NOT NULL,
	item varchar(100) NOT NULL,
	list_code varchar(100) NOT NULL
);
