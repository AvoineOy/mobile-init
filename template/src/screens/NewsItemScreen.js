import React from 'react';
import { connect } from 'react-redux'

import { loginRequired } from '../loginRequired'
import { NewsItemScreen } from '@avoine/mobile-components'

export default loginRequired(connect()(NewsItemScreen), true);