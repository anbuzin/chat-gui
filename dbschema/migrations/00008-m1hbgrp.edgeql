CREATE MIGRATION m1hbgrpfwu3hazstft5ik4nv7bpewsye35cyjdyi4aqn6rdcm4oa7q
    ONTO m1nuydnxjqoxuy4hvdbstgnwu53ov7ug3tukwbfzjnsin3ci5u2goq
{
  ALTER TYPE default::Message {
      DROP LINK chat;
  };
  ALTER TYPE default::Message {
      CREATE REQUIRED LINK chat: default::Chat {
          SET REQUIRED USING (<default::Chat>{});
      };
  };
  ALTER TYPE default::Chat {
      ALTER LINK archive {
          USING (.<chat[IS default::Message]);
      };
  };
  ALTER TYPE default::Part {
      CREATE REQUIRED LINK message: default::Message {
          SET REQUIRED USING (<default::Message>{});
      };
  };
  ALTER TYPE default::Message {
      ALTER LINK parts {
          USING (.<message[IS default::Part]);
      };
      DROP TRIGGER post_foo;
  };
};
