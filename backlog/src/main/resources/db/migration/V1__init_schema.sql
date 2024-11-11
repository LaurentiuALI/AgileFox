
CREATE TABLE type(
                     id SERIAL PRIMARY KEY,
                     name VARCHAR(20)
);
CREATE TABLE state(
                      id SERIAL PRIMARY KEY,
                      name VARCHAR(20),
                      description VARCHAR(20)
);

CREATE TABLE BACKLOG_ITEM(
                             id SERIAL PRIMARY KEY,
                             uid VARCHAR(10),
                             typeId INTEGER references type,
                             title TEXT,
                             description TEXT,
                             stateId INTEGER references state
)