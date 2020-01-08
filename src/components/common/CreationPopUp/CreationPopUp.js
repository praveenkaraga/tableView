import React, {Component} from "react";
import {Button, Input, Modal, Select,Switch} from "antd";
import './creationPopUp.scss'
import map from "lodash/map";

const {Option} = Select;


class CreationPopUp extends Component {

    getCustomFieldsSkeleton = (type) =>{
        const {creationPopUpFirstFieldChangeHandler, fieldHeader, fieldPlaceHolder, creationPopUpSecondFieldChangeHandler,secondFieldHeader=`Type`,thirdFieldHeader=`Required`,creationPopUpThirdFieldChangeHandler} = this.props
        const {
            secondFieldOptions = [{name: 'Single Select', key: 'single_select'}, {
                name: 'Multi Select',
                key: 'multi_select'
            }]
        } = this.props;
        return <div>
            <div>
                <div>{fieldHeader}</div>
                <Input placeholder={fieldPlaceHolder} className={'preferred-field-class'}
                       onChange={creationPopUpFirstFieldChangeHandler}/></div>
            <div className={'second-field-wrap'}>
                <div>{secondFieldHeader}</div>
                <Select defaultValue={secondFieldOptions[0].key}
                        onChange={creationPopUpSecondFieldChangeHandler}
                        className={'second-field-element'}
                        disabled={type === 'edit' ? true : false}
                >
                    {map(secondFieldOptions, function (ele, inde) {
                        return <Option value={ele.key}
                                       key={ele.key}>{ele.name}</Option>

                    })}
                </Select>
            </div>
            <div className={'third-field-wrap'}>
                <div>{thirdFieldHeader}</div>
                <Switch defaultChecked onChange={creationPopUpThirdFieldChangeHandler}  className={'third-field-element'}/>
            </div>
        </div>
    }

    getRequiredFields = (customField) => {
        const {creationPopUpFirstFieldChangeHandler, fieldHeader, fieldPlaceHolder} = this.props
        switch (customField) {
            case 'add' : {
                return this.getCustomFieldsSkeleton('add')
            }
            case 'edit' : {
                return this.getCustomFieldsSkeleton('edit')
            }
            default : {
                return <div>
                    <div>{fieldHeader}</div>
                    <Input placeholder={fieldPlaceHolder} className={'preferred-field-class'}
                           onChange={creationPopUpFirstFieldChangeHandler}/>
                </div>
            }
        }
    };


    render() {
        const {creationPopUpVisibility = false, creationPopUpTitle = `Add New Department`, creationPopFirstButtonName = `Cancel`, creationPopSecondButtonName = `Create`, creationPopFirstButtonHandler, creationPopSecondButtonHandler, customField, creationPopUpFirstFieldChangeHandler} = this.props
        const {
            secondFieldOptions = [{name: 'Single Select', key: 'single_select'}, {
                name: 'Multi Select',
                key: 'multi_select'
            }]
        } = this.props;
        return (
            <div className={'creation-pop-up'}>
                <Modal
                    title={creationPopUpTitle}
                    visible={creationPopUpVisibility}
                    onCancel={creationPopFirstButtonHandler}
                    footer={[
                        <Button key="cancel" onClick={() => creationPopFirstButtonHandler()}>
                            {creationPopFirstButtonName}
                        </Button>,
                        <Button key="create" onClick={() => creationPopSecondButtonHandler()}
                                type="primary">{creationPopSecondButtonName}</Button>,
                    ]}
                    centered>

                    {this.getRequiredFields(customField)}
                </Modal>

            </div>
        )
    }
}

export default CreationPopUp
