CREATE MIGRATION m1agqnjzg46ynqcix42zyi4sdy4gf6pontldpqmlme2c4g7l5745ha
    ONTO m15a24xy2uovkzffvoldsifesricbnca2xbcy3fkj7jwgtetm5kfua
{
  ALTER TYPE default::Chat {
      DROP ACCESS POLICY owner_has_full_access;
  };
  ALTER TYPE default::Message {
      DROP ACCESS POLICY owner_has_full_access;
  };
  ALTER TYPE default::Chat {
      DROP LINK owner;
  };
  DROP GLOBAL default::current_user;
  DROP TYPE default::User;
};
