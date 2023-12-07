import {
    Button,
    Input,
    Form,
    Dialog,
    Table,
    Select,
    MessagePlugin,
    Popup,
} from "tdesign-react";
import QRCode from "qrcode.react";
import { SearchIcon } from "tdesign-icons-react";
import { useEffect, useRef, useState } from "react";
import { request } from "../../../utils/axios";
import { getRegWeappRequest, submitRegWeappRequest } from "../../../utils/apis";
import styles from "./index.module.less";
import Detail from "./detail";

const { FormItem } = Form;
const codeOptions = [
    {
        label: "统一社会信用代码（18 位）",
        value: 1,
    },
    {
        label: "组织机构代码（9 位）",
        value: 2,
    },
    {
        label: "营业执照注册号(15 位)",
        value: 3,
    },
];

export default function FastRegWeapp() {
    const pageSize = 10;
    const formRef = useRef() as any;
    const [page, setPage] = useState(1);
    const [data, setData] = useState<any[]>([]);
    const [total, setTotal] = useState<number>(0);

    const [isTableLoading, setIsTableLoading] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [search, setSearch] = useState({
        search_text: "",
    });
    const [updateData, setUpdateData] = useState<any>({});
    const [detailData, setDetailData] = useState<any>({});

    useEffect(() => {
        getList();
    }, [page]);

    // 获取数据
    const getList = async () => {
        setIsTableLoading(true);
        const res: any = await request({
            request: getRegWeappRequest,
            data: {
                limit: pageSize,
                offset: (page - 1) * pageSize,
                ...search,
            },
        });
        if (res.code === 0) {
            setData(res?.data?.records);
            setTotal(res?.data?.total);
        }
        setIsTableLoading(false);
    };
    // 搜索
    const handleSearch = (v: any) => {
        setPage(1);
        getList();
    };
    // 添加修改
    const handleSubmit = (item: any) => {
        setUpdateData(item);
        setTimeout(() => {
            formRef.current.setFieldsValue(item);
        }, 100);
        setShowModal(true);
    };
    const handleCloseCreateModal = () => {
        formRef.current.reset();
        setShowModal(false);
    };
    const handleCreate = async (e: any) => {
        if (e.validateResult !== true) {
            return;
        }
        const data = formRef.current.getAllFieldsValue();
        submit(data);
    };
    const submit = async (data: any) => {
        const resp = await request({
            request: submitRegWeappRequest,
            data: {
                id: updateData.id,
                state: updateData.state,
                ...data,
            },
        });
        if (resp.code === 0) {
            MessagePlugin.success("快速注册小程序提交成功，请耐心等待");
            handleCloseCreateModal();
            getList();
        }
    };

    const handleChange = (v: any) => {
        setSearch({ ...search, search_text: v });
    };
    const handleDetail = (item: any) => {
        setDetailData(item);
    };
    const handleDetailClose = () => {
        setDetailData({});
    };

    return (
        <div>
            <p className="text">快速注册小程序介绍</p>
            <div className="normal_flex">
                <div className="blue_circle" />
                <p className="desc" style={{ margin: 0 }}>
                    创建的小程序无需交 300 元认证费即可完成认证。
                </p>
            </div>
            <div className="normal_flex">
                <div className="blue_circle" />
                <p className="desc">
                    优化注册流程，减轻了小程序主体、类目资质信息收集的人力成本。
                </p>
            </div>
            <div className={styles.container}>
                <div className={styles.searchContent}>
                    <Button onClick={() => handleSubmit({})}>添加小程序</Button>
                    <div className={styles.search}>
                        <Form layout="inline" labelWidth={60}>
                            <Input
                                style={{ width: "300px" }}
                                name="search_text"
                                onChange={handleChange}
                                placeholder="请输入企业名称，支持模糊搜索"
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
                    <Table
                        loading={isTableLoading}
                        data={data}
                        columns={[
                            {
                                align: "center",
                                width: 100,
                                minWidth: 100,
                                className: "row",
                                ellipsis: true,
                                colKey: "name",
                                title: "企业名",
                            },
                            {
                                align: "center",
                                width: 100,
                                minWidth: 100,
                                className: "row",
                                ellipsis: true,
                                colKey: "code",
                                title: "企业代码",
                            },
                            {
                                align: "center",
                                width: 100,
                                minWidth: 100,
                                className: "row",
                                ellipsis: true,
                                colKey: "legal_persona_wechat",
                                title: "法人微信",
                            },
                            {
                                align: "center",
                                width: 100,
                                minWidth: 100,
                                className: "row",
                                ellipsis: true,
                                colKey: "legal_persona_name",
                                title: "法人姓名",
                            },
                            {
                                align: "center",
                                width: 100,
                                minWidth: 100,
                                className: "row",
                                ellipsis: true,
                                colKey: "state",
                                title: "状态",
                                cell({ row }) {
                                    switch (row.state) {
                                        case 99:
                                            return (
                                                <span>
                                                    注册成功，
                                                    <Popup
                                                        trigger="click"
                                                        showArrow
                                                        content={
                                                            <QRCode value={row.auth_code} />
                                                        }
                                                    >
                                                        <a className="custom-a">
                                                            查看授权码
                                                        </a>
                                                    </Popup>
                                                </span>
                                            );
                                        case 0:
                                            return <span>已提交</span>;
                                        default:
                                            return (
                                                <span>
                                                    微信失败，
                                                    <Popup
                                                        trigger="click"
                                                        showArrow
                                                        content={row.memo}
                                                    >
                                                        <a className="custom-a">
                                                            查看原因
                                                        </a>
                                                    </Popup>
                                                </span>
                                            );
                                    }
                                },
                            },
                            {
                                align: "center",
                                colKey: "op",
                                width: 120,
                                minWidth: 90,
                                title: "操作",
                                cell({ row }) {
                                    return (
                                        <>
                                            <Button
                                                theme="primary"
                                                variant="text"
                                                disabled={
                                                    row.state === 99 ||
                                                    row.state === 0
                                                }
                                                onClick={() =>
                                                    handleSubmit(row)
                                                }
                                            >
                                                提交
                                            </Button>
                                            <Button
                                                theme="primary"
                                                variant="text"
                                                onClick={() =>
                                                    handleDetail(row)
                                                }
                                            >
                                                详情
                                            </Button>
                                        </>
                                    );
                                },
                            },
                        ]}
                        rowKey="index"
                        tableLayout="auto"
                        verticalAlign="middle"
                        size="small"
                        bordered={false}
                        hover
                        rowClassName={(rowKey) => `${rowKey}-class`}
                        // 与pagination对齐
                        pagination={{
                            pageSize,
                            total,
                            current: page,
                            pageSizeOptions: [],
                            onCurrentChange: (current) => setPage(current),
                            showJumper: true,
                        }}
                    />
                </div>
            </div>
            <Dialog
                visible={showModal}
                onClose={handleCloseCreateModal}
                cancelBtn={false}
                confirmBtn={false}
                header="提交小程序"
            >
                <div>
                    <Form onSubmit={handleCreate} ref={formRef} colon={true}>
                        <FormItem
                            name="name"
                            label="企业名称"
                            rules={[
                                {
                                    required: true,
                                    message: "企业名称必填",
                                    type: "error",
                                },
                            ]}
                            initialData={updateData.name}
                            help="企业名（需与工商部门登记信息一致）；如果是“无主体名称个体工商户”则填“个体户+法人姓名”，例如“个体户张三”"
                        >
                            <Input
                                clearable={true}
                                placeholder="请输入企业名称"
                            />
                        </FormItem>
                        <FormItem
                            name="code_type"
                            label="企业代码类型"
                            rules={[
                                {
                                    required: true,
                                    message: "企业代码类型必选",
                                    type: "error",
                                },
                            ]}
                            initialData={updateData.code_type}
                        >
                            <Select options={codeOptions} />
                        </FormItem>
                        <FormItem
                            name="code"
                            label="企业代码"
                            rules={[
                                {
                                    required: true,
                                    message: "企业代码必填",
                                    type: "error",
                                },
                            ]}
                            initialData={updateData.code}
                        >
                            <Input
                                clearable={true}
                                placeholder="请输入企业代码"
                            />
                        </FormItem>
                        <FormItem
                            name="legal_persona_name"
                            label="法人姓名"
                            rules={[
                                {
                                    required: true,
                                    message: "法人姓名必填",
                                    type: "error",
                                },
                            ]}
                            initialData={updateData.legal_persona_name}
                        >
                            <Input
                                clearable={true}
                                placeholder="请输入法人姓名"
                            />
                        </FormItem>
                        <FormItem
                            name="legal_persona_wechat"
                            label="法人微信号"
                            rules={[
                                {
                                    required: true,
                                    message: "法人微信号必填",
                                    type: "error",
                                },
                            ]}
                            initialData={updateData.legal_persona_wechat}
                        >
                            <Input
                                clearable={true}
                                placeholder="请输入法人微信号"
                            />
                        </FormItem>
                        <FormItem
                            name="component_phone"
                            label="联系电话"
                            initialData={updateData.component_phone}
                        >
                            <Input clearable={true} />
                        </FormItem>
                        <FormItem statusIcon={false}>
                            <Button theme="primary" type="submit" block>
                                提交小程序
                            </Button>
                        </FormItem>
                    </Form>
                </div>
            </Dialog>
            <Detail data={detailData} onClose={handleDetailClose} />
        </div>
    );
}
