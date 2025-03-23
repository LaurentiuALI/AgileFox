CREATE TABLE project_user(
                             project_id BIGINT NOT NULL REFERENCES project(id) ON DELETE CASCADE,
                             user_id VARCHAR(255) NOT NULL,  -- Keycloak uses UUIDs/strings as user IDs
                             PRIMARY KEY(project_id, user_id)
);