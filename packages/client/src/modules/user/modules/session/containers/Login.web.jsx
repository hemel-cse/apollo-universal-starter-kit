/* eslint-disable no-undef */
// React
import React from 'react';

// Apollo
import { graphql, compose, withApollo } from 'react-apollo';

// Components
import LoginView from '../../../common/components/LoginView.web';
import log from '../../../../../../../common/log';

import CURRENT_USER_QUERY from '../../../common/graphql/CurrentUserQuery.graphql';
import LOGIN from '../graphql/Login.graphql';

class Login extends React.Component {
  render() {
    return <LoginView {...this.props} />;
  }
}

const LoginWithApollo = compose(
  withApollo,
  graphql(LOGIN, {
    props: ({ ownProps: { client, onLogin }, mutate }) => ({
      login: async ({ email, password }) => {
        try {
          const { data: { login } } = await mutate({
            variables: { input: { email, password } }
          });
          if (login.errors) {
            return { errors: login.errors };
          }
          await client.writeQuery({ query: CURRENT_USER_QUERY, data: { currentUser: login.user } });
          onLogin();
        } catch (e) {
          log.error(e);
        }
      }
    })
  })
)(Login);

export default LoginWithApollo;
