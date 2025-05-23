from jinja2 import Template

TOOL_INVOCATION_SHAPE = """
{
    state,
    tool_call_id,
    tool_name,
    args,
    result,
}
"""

PART_SHAPE = Template("""
{
    type_,
    text,
    reasoning,
    tool_invocation: {{TOOL_INVOCATION_SHAPE}},
    source_,
}
""").render(TOOL_INVOCATION_SHAPE=TOOL_INVOCATION_SHAPE)

MESSAGE_SHAPE = Template("""
{
    id,
    role_,
    created_at,
    content,
    annotations,
    parts: {{PART_SHAPE}},
}""").render(PART_SHAPE=PART_SHAPE)


CHAT_SHAPE = Template("""
{
    id,
    title,
    created_at,
    history: {{MESSAGE_SHAPE}},
    archive: {{MESSAGE_SHAPE}},
}""").render(MESSAGE_SHAPE=MESSAGE_SHAPE)


SELECT_CHAT_BY_ID = Template("""
select Chat {{CHAT_SHAPE}}
filter .id = <uuid>$chat_id
""").render(CHAT_SHAPE=CHAT_SHAPE)


SELECT_CHAT_INFOS = """
select Chat {
    id,
    title,
    created_at,
}
"""


INSERT_MESSAGE = Template("""
with
    chat := (select Chat filter .id = <uuid>$chat_id),
    message := (
        insert Message {
            chat := chat,
            role_ := <str>$role,
            created_at := <optional datetime>$created_at,
            content := <str>$content,
            annotations := <json>$annotations,
        }
    ),
    parts_json := <optional json>$parts,
    parts := (
        for part_item in json_array_unpack(parts_json ?? <json>[]) union (
            insert Part {
                message := message,
                type_ := <str>part_item['type'],
                text := <optional str>part_item['text'],
                reasoning := <optional str>part_item['reasoning'],
                source_ := <optional str>part_item['source'],
                # tool_invocation := (
                #     (insert ToolInvocation {
                #         state := <str>part_item['tool_invocation']['state'],
                #         tool_call_id := <str>part_item['tool_invocation']['tool_call_id'],
                #         tool_name := <str>part_item['tool_invocation']['tool_name'],
                #         args := <json>part_item['tool_invocation']['args'],
                #         result := <optional json>part_item['tool_invocation']['result'],
                #     }) if exists json_get(part_item, 'tool_invocation') else {}
                # )
            }
        )
    )
select message {{MESSAGE_SHAPE}};
""").render(MESSAGE_SHAPE=MESSAGE_SHAPE)
