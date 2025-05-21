CREATE MIGRATION m1udqi3a7r3nxxy6xtyebxxwky6yd3qwd6e7hxcopzpunipbgfocla
    ONTO m15h3jvtj7xib2armf6iyuat7tzqn35qohamf3gp3nz6jufyz3glga
{
  CREATE GLOBAL default::backend_url -> std::str {
      SET default := 'http://localhost:8000';
  };
  ALTER TYPE default::Message {
      CREATE TRIGGER post_foo
          AFTER UPDATE, INSERT 
          FOR EACH DO (WITH
              endpoint := 
                  (std::assert_exists(GLOBAL default::backend_url) ++ '/api/agent/foo')
          SELECT
              std::net::http::schedule_request(endpoint, method := std::net::http::Method.POST, headers := [('Content-Type', 'application/json')], body := std::to_bytes(std::to_str(std::json_object_pack({('chat_id', <std::json>__new__.id), ('content', <std::json>__new__.content), ('llm_role', <std::json>__new__.llm_role)}))))
          );
  };
};
