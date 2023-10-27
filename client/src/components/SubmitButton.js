import React from 'react';
import { Button, Form } from 'antd';

export default function SubmitButton({ form, confirmLoading }) {
  const [submittable, setSubmittable] = React.useState(false);

  // Watch all values
  const values = Form.useWatch([], form);
  React.useEffect(() => {
    form
      .validateFields({
        validateOnly: true,
      })
      .then(
        () => {
          setSubmittable(true);
        },
        () => {
          setSubmittable(false);
        }
      );
  }, [values]);
  return (
    <Button
      loading={confirmLoading}
      type="primary"
      htmlType="submit"
      disabled={!submittable}
    >
      Save
    </Button>
  );
}
