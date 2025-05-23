CREATE MIGRATION m1b25lmihaisezq2ddbyfatcrilrlrvkjw34wek46tzfselrgv45rq
    ONTO m1hbgrpfwu3hazstft5ik4nv7bpewsye35cyjdyi4aqn6rdcm4oa7q
{
  ALTER TYPE default::Message {
      ALTER PROPERTY created_at {
          RESET OPTIONALITY;
      };
  };
};
