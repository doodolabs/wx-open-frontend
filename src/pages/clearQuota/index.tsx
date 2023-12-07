import { Button, Select, MessagePlugin } from "tdesign-react";
import { SearchIcon } from "tdesign-icons-react";
import { useEffect, useState } from "react";
import { request } from "../../utils/axios";
import {
    clearApiQuotaRequest,
    searchAuthorizedAccountRequest,
} from "../../utils/apis";
import styles from "./index.module.less";

export default function ClearApiQuota() {
    const [value, setValue] = useState();
    const [loading, setLoading] = useState(false);
    const [options, setOptions] = useState([]);

    const onChange = (value: any) => {
        setValue(value);
    };
    const handleRemoteSearch = async (search: any) => {
        setLoading(true);

        const res: any = await request({
            request: searchAuthorizedAccountRequest,
            data: {
                search_text: search,
            },
        });
        setLoading(false);
        if (res.code === 0) {
            setOptions(res.data.records.map((v: any) => {
                return {value: v.appid, label: v.nickName}
            }));
        }
    };
    const handleClear = async () => {
        const res: any = await request({
            request: clearApiQuotaRequest,
            data: {
                app_id: value,
            },
        });
        if(res.code === 0){
            MessagePlugin.success("清空成功");
        }else{
            MessagePlugin.error("清空失败");
        }
    }

    return (
        <div>
            <p className="text">重置API调用次数</p>
            <div className="normal_flex">
                <div className="blue_circle" />
                <p className="desc" style={{ margin: 0 }}>
                    用于清空公众号/小程序/第三方等接口的每日调用接口次数。
                </p>
            </div>
            <div className="normal_flex">
                <div className="blue_circle" />
                <p className="desc">
                    每个账号每月10次清零操作机会，清零生效一次即用掉一次机会。
                </p>
            </div>
            <div className={styles.container}>
                <div className={styles.searchContent}>
                    <div className={styles.search}>
                    <Select
                        placeholder="请输入要清空的小程序账号名"
                        filterable
                        value={value}
                        onChange={onChange}
                        style={{ width: '40%' }}
                        loading={loading}
                        onSearch={handleRemoteSearch}
                        options={options}
                        
                    />
                     <Button style={{marginLeft: '12px'}} onClick={handleClear}>清空</Button>
                    </div>
                </div>
                
            </div>
        </div>
    );
}
