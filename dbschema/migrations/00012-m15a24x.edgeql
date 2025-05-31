CREATE MIGRATION m15a24xy2uovkzffvoldsifesricbnca2xbcy3fkj7jwgtetm5kfua
    ONTO m1u3pvgjxwrzxh7d7glem25mwp2zd2qhi7ruaojqokedsysvbtilaq
{
  ALTER TYPE default::Chat {
      CREATE REQUIRED LINK owner: default::User {
          SET default := (GLOBAL default::current_user);
      };
      CREATE ACCESS POLICY owner_has_full_access
          ALLOW ALL USING ((.owner ?= GLOBAL default::current_user));
  };
  ALTER TYPE default::Message {
      CREATE ACCESS POLICY owner_has_full_access
          ALLOW ALL USING ((.chat.owner ?= GLOBAL default::current_user));
  };
};
