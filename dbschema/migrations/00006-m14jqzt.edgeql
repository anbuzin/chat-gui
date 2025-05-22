CREATE MIGRATION m14jqztgqgusqtpxyvlo7k5gogmuqykwemtqss3mqnizi5ryx5j42q
    ONTO m1b5vagumeudzbzagvytznvdiyds743vpxg3tcm2g4qv5emirojfwq
{
  ALTER TYPE default::Chat {
      ALTER LINK archive {
          SET MULTI;
      };
      ALTER LINK history {
          SET MULTI;
      };
      CREATE REQUIRED PROPERTY title: std::str {
          SET default := 'New Chat';
      };
  };
};
