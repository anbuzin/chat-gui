CREATE MIGRATION m1nuydnxjqoxuy4hvdbstgnwu53ov7ug3tukwbfzjnsin3ci5u2goq
    ONTO m14jqztgqgusqtpxyvlo7k5gogmuqykwemtqss3mqnizi5ryx5j42q
{
  CREATE TYPE default::ToolInvocation {
      CREATE REQUIRED PROPERTY args: std::json;
      CREATE PROPERTY result: std::json;
      CREATE REQUIRED PROPERTY state: std::str;
      CREATE REQUIRED PROPERTY tool_call_id: std::str;
      CREATE REQUIRED PROPERTY tool_name: std::str;
  };
  CREATE TYPE default::Part {
      CREATE LINK tool_invocation: default::ToolInvocation;
      CREATE PROPERTY reasoning: std::str;
      CREATE PROPERTY source_: std::str;
      CREATE PROPERTY text: std::str;
      CREATE REQUIRED PROPERTY type_: std::str;
  };
  ALTER TYPE default::Message {
      CREATE MULTI LINK parts: default::Part;
  };
  ALTER TYPE default::Message {
      CREATE PROPERTY annotations: std::json;
  };
  ALTER TYPE default::Message {
      ALTER PROPERTY llm_role {
          RENAME TO role_;
      };
      ALTER TRIGGER post_foo USING (WITH
          endpoint := 
              (std::assert_exists(GLOBAL default::backend_url) ++ '/api/agent/foo')
          ,
          headers := 
              [('x-vercel-protection-bypass', std::assert_exists(GLOBAL default::vercel_bypass)), ('Content-Type', 'application/json')]
      SELECT
          std::net::http::schedule_request(endpoint, method := std::net::http::Method.POST, headers := headers, body := std::to_bytes(std::to_str(std::json_object_pack({('chat_id', <std::json>__new__.id), ('content', <std::json>__new__.content), ('llm_role', <std::json>__new__.role_)}))))
      );
  };
};
