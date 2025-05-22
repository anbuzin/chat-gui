CREATE MIGRATION m1b5vagumeudzbzagvytznvdiyds743vpxg3tcm2g4qv5emirojfwq
    ONTO m1lks5ej4ezuzwqyqyuk5xdfrjpxwz4m7e7ydqegpcc5hao26j4pbq
{
  ALTER TYPE default::Message {
      CREATE PROPERTY is_evicted: std::bool {
          SET default := false;
      };
  };
  CREATE TYPE default::Chat {
      CREATE LINK archive: default::Message;
      CREATE LINK history := (SELECT
          .archive
      FILTER
          NOT (.is_evicted)
      );
      CREATE REQUIRED PROPERTY created_at: std::datetime {
          SET default := (std::datetime_current());
      };
  };
  ALTER TYPE default::Message {
      CREATE LINK chat := (.<archive[IS default::Chat]);
      ALTER PROPERTY created_at {
          SET REQUIRED USING (<std::datetime>{});
      };
      ALTER PROPERTY llm_role {
          SET REQUIRED USING (<std::str>{});
      };
  };
};
