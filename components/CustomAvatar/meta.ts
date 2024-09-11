import { IMeta } from '@byted-apaas/client-sdk/component-editor';

const meta: IMeta = {
  props: [
    {
      name: 'url',
      type: 'String',
      title: '头像图片地址',
      defaultValue: 'string',
    }, {
      name: 'size',
      type: 'Number',
      title: '头像图片大小',
      defaultValue: 40,
    }, {
      name: 'name',
      type: 'String',
      title: 'Icon名称',
    }, {
      name: 'shape',
      type: 'String',
      title: '头像图片形状',
      setter: {
        type: "ChoiceSetter",
        props: {
          options: [
            { label: '圆形', value: 'circle' },
            { label: '方形', value: 'square' }
          ]
        }
      }
    }
  ],
};

export default meta;
