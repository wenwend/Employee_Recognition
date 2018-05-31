

#Qeustion: I need insert if not exist, else update to constraint the 1-1 relationship.

#Solution: posgres 9.5 support upsert.

INSERT INTO signature (data,e_id) VALUES (VALUES,VALUES) ON CONFLICT (e_id) DO UPDATE SET data = EXCLUDED.data;


#example: *single quote!

INSERT INTO signature (data, e_id) VALUES ('example',8) ON CONFLICT (e_id) DO UPDATE SET data = EXCLUDED.data;