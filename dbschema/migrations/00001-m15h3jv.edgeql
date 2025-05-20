CREATE MIGRATION m15h3jvtj7xib2armf6iyuat7tzqn35qohamf3gp3nz6jufyz3glga
    ONTO initial
{
  CREATE FUTURE simple_scoping;
  CREATE TYPE default::Message {
      CREATE PROPERTY content: std::str;
      CREATE PROPERTY created_at: std::datetime {
          SET default := (std::datetime_current());
      };
      CREATE PROPERTY llm_role: std::str;
  };
};
