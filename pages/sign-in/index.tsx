import React from 'react';
import { Form, Input, Button, Checkbox, Row, Col } from 'antd';
import cookies from 'next-cookies';
import { NextPageContext } from 'next';

import logger from '@libs/logger';
import { SignInPropType } from '@models/auth';
import { querySignIn } from '@queries/hooks/auth';

const SignIn = () => {
    const { mutate: signIn, isLoading: loadingSignIn } = querySignIn();
    const onFinish = (values: SignInPropType) => {
        logger.debug('Data SignIn:', values);
        void signIn(values);
    };

    const onFinishFailed = (errorInfo: any) => {
        logger.debug('Failed:', errorInfo);
    };

    return (
        <Row align='middle' justify='center' style={{ height: '100vh' }}>
            <Col span={6}>
                <Form
                    name='basic'
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete='off'
                >
                    <Form.Item
                        label='email'
                        name='email'
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label='Password'
                        name='password'
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item name='remember' valuePropName='checked' wrapperCol={{ offset: 8, span: 16 }}>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type='primary' htmlType='submit' loading={loadingSignIn}>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
};

export const getServerSideProps = async (context: NextPageContext) => {
    const { accessToken } = cookies(context);
    if (accessToken) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }
    return {
        props: {},
    };
};

export default SignIn;
