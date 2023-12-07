import styles from './index.module.less'
import { Alert } from 'tdesign-react'
import home01 from '../../assets/icons/home01.png'
import home02 from '../../assets/icons/home02.png'
import home03 from '../../assets/icons/home03.png'
import home04 from '../../assets/icons/home04.png'
import contact from '../../assets/icons/contact.png'
import { routes } from "../../config/route";

export default function Home() {

    return (
        <div className={styles.home}>
            <Alert theme="info" icon={<span />} message="欢迎体验基于微信第三方平台本地化搭建的“服务商微管家”SaaS应用。如有更多的需求或者使用问题微信扫码进行反馈。" />
            <div className={styles.home_header}>
                <div className={styles.home_header_box}>
                    <p className={styles.home_title}>产品体验指引</p>

                    <div className={styles.home_header_step}>

                        <div className={styles.home_header_step_item}>
                            <p className={styles.home_header_step_item_number}>1</p>
                            <p className={styles.home_header_step_item_title}>快速注册小程序</p>
                            <p className={`${styles.home_header_step_item_desc} desc`}>帮助第三方平台迅速拓展线下商户，占领小程序线下商业先机。<a href={`#${routes.fastRegWeapp.path}`} className="a">前往体验</a></p>
                        </div>

                        <div className={styles.home_header_step_line}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>

                        <div className={styles.home_header_step_item}>
                            <p className={styles.home_header_step_item_number}>2</p>
                            <p className={styles.home_header_step_item_title}>获取商家授权</p>
                            <p className={`${styles.home_header_step_item_desc} desc`}>服务商获得商家小程序授权后，即可代商家开发和运营小程序。<a href={`#${routes.authPageManage.path}`} className="a">前往体验</a></p>
                        </div>

                        <div className={styles.home_header_step_line}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>

                        <div className={styles.home_header_step_item}>
                            <p className={styles.home_header_step_item_number}>3</p>
                            <p className={styles.home_header_step_item_title}>管理授权帐号</p>
                            <p className={`${styles.home_header_step_item_desc} desc`}>可批量管理已授权商家公众号和小程序，可对授权帐号进行批量操作。<a href={`#${routes.authorizedAccountManage.path}`} className="a">前往体验</a></p>
                        </div>

                    </div>
                </div>
                <div className={styles.home_header_box}>
                    <p className={styles.home_title}>联系我们</p>

                    <div className={styles.home_header_contact_detail}>
                        <img className={styles.home_header_contact_detail_img} src={contact} alt="" />
                        <p className={`${styles.home_header_contact_detail_text} desc`} style={{ marginTop: '10px' }}>添加微信联系人，获得技术支持</p>
                    </div>
                </div>
            </div>

            <div className={styles.home_characteristic}>
                <p className={styles.home_title}>产品特性</p>
                <div className={styles.home_characteristic_list}>
                    <div className={styles.home_characteristic_list_item}>
                        <img className={styles.home_characteristic_list_item_icon} src={home01} alt="" />
                        <div className={styles.home_characteristic_list_item_box}>
                            <p className={styles.home_characteristic_list_item_box_title}>开箱即用</p>
                            <p className={`${styles.home_characteristic_list_item_box_desc} desc`}>内置开箱即用的SaaS应用，便于服务商快速获得商家小程序授权、0成本启动服务商业务。</p>
                        </div>
                    </div>

                    <div className={styles.home_characteristic_list_item}>
                        <img className={styles.home_characteristic_list_item_icon} src={home02} alt="" />
                        <div className={styles.home_characteristic_list_item_box}>
                            <p className={styles.home_characteristic_list_item_box_title}>最佳实践</p>
                            <p className={`${styles.home_characteristic_list_item_box_desc} desc`}>内置应用是官方基于最佳实践进行设计，帮助新手服务商快速掌握基于第三方平台开展业务。</p>
                        </div>
                    </div>

                    <div className={styles.home_characteristic_list_item}>
                        <img className={styles.home_characteristic_list_item_icon} src={home03} alt="" />
                        <div className={styles.home_characteristic_list_item_box}>
                            <p className={styles.home_characteristic_list_item_box_title}>可轻松扩展</p>
                            <p className={`${styles.home_characteristic_list_item_box_desc} desc`}>内置消息和事件转发至内部业务系统，开发者可快速低成本与业务系统集成。</p>
                        </div>
                    </div>

                    <div className={styles.home_characteristic_list_item}>
                        <img className={styles.home_characteristic_list_item_icon} src={home04} alt="" />
                        <div className={styles.home_characteristic_list_item_box}>
                            <p className={styles.home_characteristic_list_item_box_title}>本地部署</p>
                            <p className={`${styles.home_characteristic_list_item_box_desc} desc`}>支持本地部署方便调试、排错，版本跟随官方开源版本定期维护升级。</p>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}
