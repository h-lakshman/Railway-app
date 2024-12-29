import React from 'react';
import { Flex, Spin } from 'antd';
const contentStyle = {
    padding: 50,
    background: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 4,
};
const content = <div style={contentStyle} />;
const Spinner = () => (
    <Flex gap="middle" vertical>
        <Flex gap="middle">
            <Spin tip="Please wait while we are confirming your tickets" size="large" fullscreen>
                {content}
            </Spin>
        </Flex>
    </Flex>
);
export default Spinner;