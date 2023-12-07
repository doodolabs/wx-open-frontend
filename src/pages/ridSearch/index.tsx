import { Input, Form, Table, Row, Col, Loading } from "tdesign-react";
import { SearchIcon } from "tdesign-icons-react";
import { useEffect, useState } from "react";
import { request } from "../../utils/axios";
import { getRidSearchRequest } from "../../utils/apis";
import styles from "./index.module.less";

export default function RidSearch() {
    const [data, setData] = useState<any>({});

    const [isTableLoading, setIsTableLoading] = useState<boolean>(false);
    const [search, setSearch] = useState({
        rid: "",
    });

    const cloums: any = [
        { name: "请求时间", filed: "invoke_time" },
        { name: "请求耗时", filed: "cost_in_ms" },
        { name: "请求URL参数", filed: "request_url" },
        { name: "请求body参数", filed: "request_body" },
        { name: "返回结果", filed: "response_body" },
        { name: "请求IP", filed: "client_ip" },
    ];

    // 获取数据
    const getRidRecord = async () => {
        setIsTableLoading(true);
        const res: any = await request({
            request: getRidSearchRequest,
            data: {
                ...search,
            },
        });
        if (res.code === 0) {
            res?.data && setData(res?.data);
        }
        setIsTableLoading(false);
    };
    // 搜索
    const handleSearch = (v: any) => {
        getRidRecord();
    };
    const handleChange = (v: any) => {
        setSearch({ ...search, rid: v });
    };

    return (
        <div>
            <p className="text">查询rid信息</p>
            <div className="normal_flex">
                <div className="blue_circle" />
                <p className="desc" style={{ margin: 0 }}>
                    由于查询rid信息属于开发者私密行为，因此仅支持同账号的查询。
                </p>
            </div>
            <div className="normal_flex">
                <div className="blue_circle" />
                <p className="desc">
                    支持查询过的 rid
                    错误信息本地存储，未查询过的只能查询7天内错误消息。
                </p>
            </div>
            <div className={styles.container}>
                <div className={styles.searchContent}>
                    <div className={styles.search}>
                        <Form layout="inline" labelWidth={60}>
                            <Input
                                style={{ width: "300px" }}
                                placeholder="请输入接口报错返回的 rid"
                                onChange={handleChange}
                                suffixIcon={
                                    <a className="a" onClick={handleSearch}>
                                        <SearchIcon />
                                    </a>
                                }
                            />
                        </Form>
                    </div>
                </div>
                <div className={styles.tableContainer}>
                    {Object.keys(data).length ? (
                        <Loading loading={isTableLoading}>
                            {cloums.map((v: any, k: number) => {
                                return (
                                    <Row
                                        key={k}
                                        style={{ marginBottom: "10px" }}
                                    >
                                        <Col
                                            key={k + "col1"}
                                            span={2}
                                            style={{
                                                textAlign: "right",
                                                marginBottom: "10px",
                                            }}
                                        >
                                            {v.name}：
                                        </Col>
                                        <Col key={k + "col2"} span={10}>
                                            {data[v.filed]}
                                        </Col>
                                    </Row>
                                );
                            })}
                        </Loading>
                    ) : (
                        <div className={styles.empty}>未查到结果</div>
                    )}
                </div>
            </div>
        </div>
    );
}
