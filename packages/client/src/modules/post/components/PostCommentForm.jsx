import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import Field from '../../../utils/FieldAdapter';
import { FormView, RenderField, FormButton } from '../../common/components/native';
import { required, validateForm } from '../../../../../common/validation';

const commentFormSchema = {
  content: [required]
};

const validate = values => validateForm(values, commentFormSchema);

const PostCommentForm = ({ values, handleSubmit, initialValues, setFieldTouched, setFieldValue }) => {
  let operation = 'Add';
  if (initialValues.id !== null) {
    operation = 'Edit';
  }

  return (
    <FormView>
      <Field
        name="content"
        component={RenderField}
        type="text"
        value={values.content}
        onChangeText={text => setFieldValue('content', text)}
        onBlur={() => setFieldTouched('content', true)}
      />
      <FormButton onPress={handleSubmit}>{operation}</FormButton>
    </FormView>
  );
};

PostCommentForm.propTypes = {
  handleSubmit: PropTypes.func,
  setFieldTouched: PropTypes.func,
  setFieldValue: PropTypes.func,
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  values: PropTypes.object
};

const PostCommentFormWithFormik = withFormik({
  mapPropsToValues: props => ({ content: props.comment && props.comment.content }),
  validate: values => validate(values),
  handleSubmit: function(values, { props: { onSubmit } }) {
    onSubmit(values);
  },
  displayName: 'CommentForm', // helps with React DevTools
  enableReinitialize: true
});

export default PostCommentFormWithFormik(PostCommentForm);
