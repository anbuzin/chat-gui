CREATE MIGRATION m1u3pvgjxwrzxh7d7glem25mwp2zd2qhi7ruaojqokedsysvbtilaq
    ONTO m1wzpcumk3wjxprjf6sayxgaxc2o2s5xrmc2grmgqyjs26lij5wmzq
{
  CREATE TYPE default::User {
      CREATE REQUIRED LINK identity: ext::auth::Identity;
      CREATE PROPERTY created_at: std::datetime {
          SET default := (std::datetime_current());
      };
      CREATE REQUIRED PROPERTY github_username: std::str {
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE REQUIRED PROPERTY name: std::str;
  };
  CREATE GLOBAL default::current_user := (std::assert_single((SELECT
      default::User
  FILTER
      (.identity = GLOBAL ext::auth::ClientTokenIdentity)
  )));
};
