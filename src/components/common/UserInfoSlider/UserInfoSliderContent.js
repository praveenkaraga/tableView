import React, {Component} from 'react';
import DefaultImageMale from '../../../images/profile-male.svg'
import DefaultImageFemale from '../../../images/profile-female.svg'
import {Tabs} from 'antd';
import Personal from './Personal'
import Organization from './Organization'
import Apps from './Apps'
import map from "lodash/map";
import AppsProfileTemplate from "./AppsProfileTemplate";
import isArray from 'lodash/isArray'

const {TabPane} = Tabs;


class UserInfoSliderContent extends Component {
    componentDidMount() {
    }


     callOnChange=(key, getTeamViewOrgData, userId,changeLoaderStatus) => {
        if (key === 'organization') {
            changeLoaderStatus(true)
            getTeamViewOrgData(userId)
        }
    }

    checkType=(data)=>{
        let returnValue = ''
        if(!isArray(data)){
            returnValue = data
        }else if(data.length){
            returnValue = data[0].name
        }else returnValue = ' '
        return returnValue
    }

    render() {
        const {teamUserData, userId, onCloseFunction, getTeamViewOrgData, clickedUserOrgManagerData, clickedUserOrgReporteesData, total_Count, clickedMemberData, contentLoader,changeLoaderStatus,sourceTeamView,clickedUserOrgData} = this.props
        let memberData = sourceTeamView ? clickedMemberData : teamUserData
        return (
            <div className={'user-info-slider-content'} key={userId}>
                <div className={'user-details-header-content'}>
                    <div className={'user-info-slider-close'} onClick={() => onCloseFunction(false)}></div>
                    <div className={'edit-button'}>Edit</div>
                </div>
                <div className={'user-profile-hold'}>
                    {memberData ? <div className={'user-profile-details'}>
                        {memberData ? memberData.profile_image ?
                            <div className={'user-icon'}
                                 style={{backgroundImage: `url(${memberData.profile_image.thumbnail})`}}></div>
                            : memberData.gender === 'female' ? <div className={'user-template-icon'}
                                                                           style={{backgroundImage: `url(${DefaultImageFemale})`}}></div> :
                                <div className={'user-icon'}
                                     style={{backgroundImage: `url(${DefaultImageMale})`}}></div>
                            : ''}
                        <div className={'user-name'}>{memberData.firstname} {memberData.lastname}</div>
                        <div
                            className={'user-designation'}>{memberData.designations ? this.checkType(memberData.designations) : ''}</div>
                        {/*<div className={'user-location'}>Location : Bangalore</div>*/}
                    </div> : ''}

                </div>
                <div className={'user-details-content'}>
                    <Tabs defaultActiveKey="personal"
                          onChange={(key) => this.callOnChange(key, this.props.getTeamViewOrgData, userId ,changeLoaderStatus)}
                          className={'user-slider-tab'}>
                        <TabPane tab="Personal" key="personal">
                            {contentLoader ? <div className={'content-loader'}></div> : <div className={'tab-content'}>
                                <Personal teamUserData={teamUserData} userId={userId} />
                            </div>}
                        </TabPane>
                        <TabPane tab="Organization" key="organization">
                            <div className={'tab-content'}>
                                {contentLoader ? <div className={'content-loader'}></div> : <div className={'tab-content'}>
                                    <Organization userId={userId} getTeamViewOrgData={getTeamViewOrgData} clickedUserOrgData={clickedUserOrgData}
                                                  clickedUserOrgManagerData={clickedUserOrgManagerData}
                                                  clickedUserOrgReporteesData={clickedUserOrgReporteesData}
                                                  total_Count={total_Count}/>
                                </div>}

                            </div>
                        </TabPane>
                        <TabPane tab="Apps" key="apps">
                            <div className={'tab-content'}>
                                <Apps teamUserData={teamUserData} userId={userId}/>
                            </div>
                        </TabPane>
                        <TabPane tab="Profiles" key="profiles">
                            <div className={'tab-content'}>
                                <div className={'app-profile-wrap'}>
                                    {map(teamUserData ? teamUserData.profiles : [], ele =>
                                        <AppsProfileTemplate data={ele}/>)}
                                </div>
                            </div>
                        </TabPane>
                    </Tabs>
                </div>


            </div>
        )
    }
}

export default UserInfoSliderContent
