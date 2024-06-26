/*INSERT INTO tag(name, tag_id) VALUES ('Boat', 1000);
INSERT INTO tag(name, tag_id) VALUES ('TV', 1001);
INSERT INTO tag(name, tag_id) VALUES ('Wi-fi', 1002);

INSERT INTO fishing_equipment(name, fishing_equipment_id) VALUES ('Boat', 1000);
INSERT INTO fishing_equipment(name, fishing_equipment_id) VALUES ('Fishing rods', 1001);
INSERT INTO fishing_equipment(name, fishing_equipment_id) VALUES ('Baits', 1002);
*/


INSERT INTO photo(id, original_filename, stored_filename,
"size")
VALUES ('2d74b08c-b270-4d7a-ae26-c278bd13816c',
'onetwothree.png', '123123123.png', 3515313);

INSERT INTO photo(id, original_filename, stored_filename,
"size")
VALUES ('6b59eb17-a24f-4044-8868-8120a2168960',
'fourfivesix.png', '456456456.png', 4564636);

INSERT INTO photo(id, original_filename, stored_filename,
"size")
VALUES ('ac29818c-5e95-438c-85ff-da0a25cd188c',
'seveneightnine.png', '789789789.png', 1335053);

/*
INSERT INTO customer(id, avatar_id, first_name, last_name,
username, address, city, country_code, phone_number,
password, enabled, points, penalties) VALUES
(1001, '2d74b08c-b270-4d7a-ae26-c278bd13816c', 'John', 'Smith',
'smith25@email.com', 'Karadjordjeva bb', 'Novi Sad',
'RS', '0696969696', 'password', true, 0, 0);


INSERT INTO public.advertiser(
    id, enabled, address, city, country_code, username, first_name, last_name, password, phone_number, avatar_id, points)
VALUES (1002, TRUE , 'Mise Dimitrijevica 1', 'Novi Sad', 'SR', 'maja@gmail.com', 'Maja', 'Majic', 'majamaja', '12345678', 'ac29818c-5e95-438c-85ff-da0a25cd188c', 0);

INSERT INTO public.address(
    id, address, city, country_code, latitude, longitude, postal_code, state)
VALUES (1001, 'Gogoljeva 2', 'Novi Sad', 'RS', '0.0', '0.0', '21000', 'Srbija');

INSERT INTO public.address(
    id, address, city, country_code, latitude, longitude, postal_code, state)
VALUES (1002, 'Gogoljeva 2', 'Novi Sad', 'RS', '0.0', '0.0', '21000', 'Srbija');

INSERT INTO public.address(
    id, address, city, country_code, latitude, longitude, postal_code, state)
VALUES (1003, 'Gogoljeva 2', 'Novi Sad', 'RS', '0.0', '0.0', '21000', 'Srbija');

INSERT INTO public.address(
    id, address, city, country_code, latitude, longitude, postal_code, state)
VALUES (1004, 'Gogoljeva 2', 'Novi Sad', 'RS', '0.0', '0.0', '21000', 'Srbija');

INSERT INTO public.address(
    id, address, city, country_code, latitude, longitude, postal_code, state)
VALUES (1005, 'Gogoljeva 2', 'Novi Sad', 'RS', '0.0', '0.0', '21000', 'Srbija');

INSERT INTO public.address(
    id, address, city, country_code, latitude, longitude, postal_code, state)
VALUES (1006, 'Gogoljeva 2', 'Novi Sad', 'RS', '0.0', '0.0', '21000', 'Srbija');

INSERT INTO public.address(
    id, address, city, country_code, latitude, longitude, postal_code, state)
VALUES (1007, 'Gogoljeva 2', 'Novi Sad', 'RS', '0.0', '0.0', '21000', 'Srbija');


INSERT INTO public.resort_ad(
    id, available_after, available_until, currency, description, pricing_description, rules, title, address_id, advertiser_id, check_in_time, check_out_time, number_of_beds, capacity, price_per_day)
VALUES (1001, now(), now(), '$', 'jako jako lepa', 'nema popusta', 'pravila neka', 'Vila brvnara', 1001, 1002, now(), now(), 3, 10, 100);

INSERT INTO public.resort_ad(
    id, available_after, available_until, currency, description, pricing_description,
    rules, title, address_id, advertiser_id, check_in_time, check_out_time, number_of_beds, capacity, price_per_day)
VALUES (1002, now(), now(), '$', 'Cabin with an incredible view of the Marijuana lakes.', 'nema popusta',
'pravila neka', 'Mary Jane''s Cabin', 1007, 1002, now(), now(), 3, 10, 100);

INSERT INTO public.resort_ad(
    id, available_after, available_until, currency, description, pricing_description,
    rules, title, address_id, advertiser_id, check_in_time, check_out_time, number_of_beds, capacity, price_per_day)
VALUES (1003, now(), now(), '$', 'Enjoy the sunset smoking the finest stones on the east coast.',
'nema popusta', 'pravila neka', 'Crackhead''s Nest', 1003, 1002, now(), now(), 6, 10, 100);

INSERT INTO public.resort_ad(
    id, available_after, available_until, currency, description, pricing_description,
    rules, title, address_id, advertiser_id, check_in_time, check_out_time, number_of_beds, capacity, price_per_day)
VALUES (1004, timestamp '2022-01-01 00:00:00', timestamp '2022-12-31 00:00:00', '$', 'See the stars. All of them', 'nema popusta', 'pravila neka',
'Cokehead''s Haven', 1004, 1002, now(), now(), 3, 10, 100);

INSERT INTO public.resort_ad(
    id, available_after, available_until, currency, description, pricing_description,
    rules, title, address_id, advertiser_id, check_in_time, check_out_time, number_of_beds, capacity, price_per_day)
VALUES (1005, now(), now(), '$', 'Enjoy a beautiful view of the dragons. Like, real dragons. Trust me bro.',
'nema popusta', 'pravila neka', 'Mushroom Cottage', 1005, 1002, now(), now(), 3, 10, 100);

INSERT INTO public.resort_ad(
    id, available_after, available_until, currency, description, pricing_description,
    rules, title, address_id, advertiser_id, check_in_time, check_out_time, number_of_beds, capacity, price_per_day)
VALUES (1006, now(), now(), '$', 'Dance on the burning lake. All night. All day.', 'nema popusta',
'pravila neka', 'Molly''s Lakeside', 1006, 1002, now(), now(), 3, 10, 100);




INSERT INTO public.boat_ad(
    id, available_after, available_until, currency, description, pricing_description, rules, title, address_id, advertiser_id, check_in_time, check_out_time, boat_length, boat_speed, boat_type, cancellation_fee, capacity, engine_number, engine_power, price_per_day)
VALUES (1007, now(), now(), '$', 'jako jako lepa', 'nema popusta', 'pravila neka', 'Brodić',
1002, 1002, now(), now(), 'xl', 'jako brz', 'jahta', 100, 20, 'puno', 'bas jaki', 90);

INSERT INTO public.boat_ad(
    id, available_after, available_until, currency, description, pricing_description, rules, title, address_id, advertiser_id, check_in_time, check_out_time, boat_length, boat_speed, boat_type, cancellation_fee, capacity, engine_number, engine_power, price_per_day)
VALUES (1008, now(), now(), '$', 'jako jako lepa', 'nema popusta', 'pravila neka', 'Čamac',
1002, 1002, now(), now(), 'xl', 'jako brz', 'jahta', 100, 20, 'puno', 'bas jaki', 80);

INSERT INTO public.boat_ad(
    id, available_after, available_until, currency, description, pricing_description, rules, title, address_id, advertiser_id, check_in_time, check_out_time, boat_length, boat_speed, boat_type, cancellation_fee, capacity, engine_number, engine_power, price_per_day)
VALUES (1009, now(), now(), '$', 'jako jako lepa', 'nema popusta', 'pravila neka', 'Titanik 3',
1002, 1002, now(), now(), 'xl', 'jako brz', 'jahta', 100, 20, 'puno', 'bas jaki', 70);

INSERT INTO public.boat_ad(
    id, available_after, available_until, currency, description, pricing_description, rules, title, address_id, advertiser_id, check_in_time, check_out_time, boat_length, boat_speed, boat_type, cancellation_fee, capacity, engine_number, engine_power, price_per_day)
VALUES (10010, now(), now(), '$', 'jako jako lepa', 'nema popusta', 'pravila neka', 'Costa Concordia',
1002, 1002, now(), now(), 'xl', 'jako brz', 'jahta', 100, 20, 'puno', 'bas jaki', 75);

INSERT INTO public.boat_ad(
    id, available_after, available_until, currency, description, pricing_description, rules, title, address_id, advertiser_id, check_in_time, check_out_time, boat_length, boat_speed, boat_type, cancellation_fee, capacity, engine_number, engine_power, price_per_day)
VALUES (1011, now(), now(), '$', 'jako jako lepa', 'nema popusta', 'pravila neka', 'Costa Concordia',
1002, 1002, now(), now(), 'xl', 'jako brz', 'jahta', 100, 20, 'puno', 'bas jaki', 85);

INSERT INTO public.boat_ad(
    id, available_after, available_until, currency, description, pricing_description, rules, title, address_id, advertiser_id, check_in_time, check_out_time, boat_length, boat_speed, boat_type, cancellation_fee, capacity, engine_number, engine_power, price_per_day)
VALUES (1012, now(), now(), '$', 'jako jako lepa', 'nema popusta', 'pravila neka', 'Costa Concordia',
1002, 1002, now(), now(), 'xl', 'jako brz', 'jahta', 100, 20, 'puno', 'bas jaki', 95);




INSERT INTO public.adventure_ad(
    id, available_after, available_until, currency, description, pricing_description, rules, title,
    address_id, advertiser_id, cancellation_fee, capacity, instructor_bio, price_per_person)
VALUES (1013, now(), now(), '$', 'jako jako lepa', 'nema popusta', 'pravila neka','Pecamo zajedno',
1002, 1002, 100, 20, 'bas jaki', 27);
INSERT INTO public.advertisement_photos(
    advertisement_id, photos_id)
VALUES (1013, 'ac29818c-5e95-438c-85ff-da0a25cd188c');

INSERT INTO public.adventure_ad(
    id, available_after, available_until, currency, description, pricing_description, rules, title,
    address_id, advertiser_id, cancellation_fee, capacity, instructor_bio, price_per_person)
VALUES (1014, now(), now(), '$', 'jako jako lepa', 'nema popusta', 'pravila neka','Pecaroš Mile',
1002, 1002, 100, 20, 'bas jaki', 27);

INSERT INTO public.adventure_ad(
    id, available_after, available_until, currency, description, pricing_description, rules, title,
    address_id, advertiser_id, cancellation_fee, capacity, instructor_bio, price_per_person)
VALUES (1015, now(), now(), '$', 'jako jako lepa', 'nema popusta', 'pravila neka','Bane Somina',
1002, 1002, 100, 20, 'bas jaki', 27);

INSERT INTO public.adventure_ad(
    id, available_after, available_until, currency, description, pricing_description, rules, title,
    address_id, advertiser_id, cancellation_fee, capacity, instructor_bio, price_per_person)
VALUES (1016, now(), now(), '$', 'jako jako lepa', 'nema popusta', 'pravila neka','Pecaj Sa Mnom',
1002, 1002, 100, 20, 'bas jaki', 27);

INSERT INTO public.adventure_ad(
    id, available_after, available_until, currency, description, pricing_description, rules, title,
    address_id, advertiser_id, cancellation_fee, capacity, instructor_bio, price_per_person)
VALUES (1017, now(), now(), '$', 'jako jako lepa', 'nema popusta', 'pravila neka','Ispecaj pa Reci',
1002, 1002, 100, 20, 'bas jaki', 27);

INSERT INTO public.adventure_ad(
    id, available_after, available_until, currency, description, pricing_description, rules, title,
    address_id, advertiser_id, cancellation_fee, capacity, instructor_bio, price_per_person)
VALUES (1018, now(), now(), '$', 'jako jako lepa', 'nema popusta', 'pravila neka','Pec Pec',
1002, 1002, 100, 20, 'bas jaki', 27);


INSERT INTO public.fishing_equipment_ads(
    fishing_equipment_id, advertisement_id)
VALUES (1, 1);
INSERT INTO public.fishing_equipment_ads(
    fishing_equipment_id, advertisement_id)
VALUES (2, 1);
INSERT INTO public.fishing_equipment_ads(
    fishing_equipment_id, advertisement_id)
VALUES (3, 1);

INSERT INTO public.tags_ads(
    tag_id, advertisement_id)
VALUES (1, 1);
INSERT INTO public.tags_ads(
    tag_id, advertisement_id)
VALUES (2, 1);
INSERT INTO public.tags_ads(
    tag_id, advertisement_id)
VALUES (3, 1);

INSERT INTO public.reservation(
    id, calculated_price, cancelled, created_at, customer_id, end_date_time, start_date_time, advertisement_id)
VALUES (1001, 400, FALSE, '2022-05-18 15:10', 1001, '2022-06-10 14:00', '2022-06-01 12:00', 1004);
INSERT INTO public.reservation(
    id, calculated_price, cancelled, created_at, customer_id, end_date_time, start_date_time, advertisement_id)
VALUES (1002, 400, FALSE, '2022-05-18 15:10', 1001, '2022-07-03 14:00', '2022-07-01 12:00', 1004);
INSERT INTO public.reservation(
    id, calculated_price, cancelled, created_at, customer_id, end_date_time, start_date_time, advertisement_id)
VALUES (1003, 400, FALSE, '2022-05-18 15:10', 1001, '2022-07-05 14:00', '2022-07-04 12:00', 1004);
INSERT INTO public.reservation(
    id, calculated_price, cancelled, created_at, customer_id, end_date_time, start_date_time, advertisement_id)
VALUES (1004, 400, FALSE, '2022-05-18 15:10', 1001, '2022-07-10 14:00', '2022-07-05 12:00', 1004);

INSERT INTO public.reservation(
    id, calculated_price, cancelled, created_at, customer_id, end_date_time, start_date_time, advertisement_id)
VALUES (6, 400, FALSE , '10-05-2022 15:20', 1001, '2022-11-01 12:00', '2022-11-01 12:00', 1013);

INSERT INTO public.resort_reservation(
    id, calculated_price, cancelled, created_at, customer_id, start_date, end_date, resort_ad_id)
VALUES (4, 400, FALSE , '10-05-2022', 1001, '2022-11-10', '2022-11-12', 1001);

INSERT INTO public.resort_reservation(
    id, calculated_price, cancelled, created_at, customer_id, start_date, end_date, resort_ad_id)
VALUES (7, 400, FALSE , '10-05-2022', 1001, '2022-11-30', '2022-12-10', 1001);
*/