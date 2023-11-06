/*
import React from 'react';
import { Upload, message } from 'antd';
import { DraggerOutlined } from '@ant-design/icons';
import { InboxOutlined } from '@ant-design/icons';
const { Dragger } = Upload;

const DraggerComponent = (num, ) => {
    const props = {
        name: 'file',
        multiple: true,
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                if(num)
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            
            console.log('Dropped files', e.dataTransfer.files[0]);
        },
    };

    return (
        <Dragger
            {...props}

            style={{ backgroundColor: "rgba(0, 124, 76, 0.15)", border: '2px dashed #007C4C', width: '300px' }}>
            <p className="ant-upload-drag-icon">
                <InboxOutlined style={{ color: '#007C4C' }} />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>

        </Dragger>
    );
};

export default DraggerComponent;
*/