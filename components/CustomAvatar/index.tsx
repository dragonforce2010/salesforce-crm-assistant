import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";

// 自定义组件开发请参考：https://ae.feishu-boe.cn/hc/zh-CN/articles/795691112919
export interface Props {
  url?: string;
  size?: number;
  name?: string;
  shape?: 'circle' | 'square';
}

const CustomAvatar:React.FC<Props> = ({
  url,
  name,
  shape,
  size,
}): JSX.Element => {
  const colors = Array.from({ length: 20 }, (_, i) => `hsl(${18 * i}, 70%, ${70 - i * 3}%)`);

  const getColor = (name = '') => {
    const hash = name.split('').reduce((a, b) => a + b.charCodeAt(0), 0)
    return colors[hash % colors.length];
  }
  const genAvatar = () => {
    if(url) {
      return <Avatar src={url} size={size} shape={shape}></Avatar>
    }

    if(name) {
      return <Avatar 
        size={size} 
        shape={shape}
        style={{backgroundColor: getColor(name)}}
      >{name}</Avatar>
    }

    return <Avatar
      icon={<UserOutlined />}
      style={{backgroundColor: getColor(name)}}
      size={size}
      shape={shape}
    ></Avatar>
  }

  return genAvatar()
  
};

export default CustomAvatar;
