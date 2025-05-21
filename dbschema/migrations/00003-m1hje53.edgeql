CREATE MIGRATION m1hje53apfpg4aty74gfltridzgxlky3nt7sxp5bhzb26pw2lky3cq
    ONTO m1udqi3a7r3nxxy6xtyebxxwky6yd3qwd6e7hxcopzpunipbgfocla
{
  CREATE GLOBAL default::vercel_bypass -> std::str {
      SET default := '';
  };
  ALTER TYPE default::Message {
      ALTER TRIGGER post_foo USING (WITH
          endpoint := 
              (std::assert_exists(GLOBAL default::backend_url) ++ '/api/agent/foo')
          ,
          headers := 
              [('x-vercel-automation-bypass', std::assert_exists(GLOBAL default::vercel_bypass)), ('Content-Type', 'application/json')]
      SELECT
          std::net::http::schedule_request(endpoint, method := std::net::http::Method.POST, headers := headers, body := std::to_bytes(std::to_str(std::json_object_pack({('chat_id', <std::json>__new__.id), ('content', <std::json>__new__.content), ('llm_role', <std::json>__new__.llm_role)}))))
      );
  };
};
