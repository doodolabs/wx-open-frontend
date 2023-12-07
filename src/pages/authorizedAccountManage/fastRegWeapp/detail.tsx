import { useEffect, useRef, useState } from "react";
import { Dialog, Row, Col } from "tdesign-react";
import moment from "moment";

export default function FastRegWeappDetail(props: any) {
    const [datas, setDatas] = useState<any>({})
    const isFirstRender = useRef(true);
    const [visible, setVisible] = useState(false);

    const cloums:any = [
        { name: "企业名", filed: "name" },
        { name: "企业代码", filed: "code" },
        { name: "法人微信", filed: "legal_persona_wechat" },
        { name: "法人姓名", filed: "legal_persona_name" },
        { name: "电话", filed: "component_phone" },
        { name: "状态", filed: "state" },
        { name: "失败原因", filed: "memo" },
        { name: "app_id", filed: "app_id" },
        { name: "app_code", filed: "app_code" },
        { name: "app_type", filed: "app_type" },
        { name: "创建时间", filed: "createtime" },
    ];

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
        } else {
            Object.keys(props.data).length && setVisible(true);
            const d = props.data
            d.createtime = moment(d.createtime).format('YYYY-MM-DD HH:mm:SS')
            d.state = d.state === 0 ? '成功' : d.state === 99 ? '注册成功' : '微信失败'
            setDatas(d)
        }
    }, [props.data]);

    const handleClose = () => {
        props.onClose();
        setVisible(false);
    };

    return (
        <Dialog
            width="50%"
            header={false}
            footer={false}
            visible={visible}
            onClose={handleClose}
        >
            {cloums.map((v: any, k: number) => {
                return (
                    <Row key={k}>
                        <Col
                            key={k + "col1"}
                            span={2}
                            style={{ textAlign: "right", marginBottom: "10px" }}
                        >
                            {v.name}：
                        </Col>
                        <Col key={k + "col2"} span={10}>
                            {datas[v.filed]}
                        </Col>
                    </Row>
                );
            })}
        </Dialog>
    );
}
