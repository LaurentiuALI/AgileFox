
CREATE TABLE IF NOT EXISTS type(
    id SERIAL PRIMARY KEY,
    name      VARCHAR(20),
    projectId INTEGER
);
CREATE TABLE IF NOT EXISTS state(
    id SERIAL   PRIMARY KEY,
    name        VARCHAR(20),
    description TEXT,
    typeId      INTEGER NOT NULL REFERENCES type(id) ON DELETE CASCADE,
    stateOrder  INTEGER NOT NULL,
    projectId   INTEGER
);

CREATE TABLE IF NOT EXISTS backlogitem(
    id          SERIAL PRIMARY KEY,
    uid         VARCHAR(10),
    typeId      INTEGER references type,
    title       TEXT,
    description TEXT,
    stateId     INTEGER references state,
    projectId   INTEGER
);

CREATE TABLE IF NOT EXISTS CARD(
    id            SERIAL  PRIMARY KEY,
    stateId       INTEGER REFERENCES state,
    typeId        INTEGER REFERENCES type,
    projectId     INTEGER,
    title         VARCHAR(55) NOT NULL,
    purpose       VARCHAR(255),
    backlogitemId INTEGER  REFERENCES backlogitem ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS checkitem(
    id              SERIAL PRIMARY KEY,
    information     VARCHAR(255),
    checked         BOOLEAN,
    cardId          INTEGER REFERENCES CARD ON UPDATE CASCADE ON DELETE CASCADE
);