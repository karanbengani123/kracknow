
import * as React from 'react';
import { StyleSheet, Linking, Text, View, Image, FlatList, ScrollView, TextInput, TouchableOpacity, Button, SafeAreaView } from 'react-native';
import Colors from '../constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { showMessage, hideMessage } from "react-native-flash-message";
import FlashMessage from "react-native-flash-message";



interface Props {
    navigation: any;

}

interface State {
}

const countries = ["Payment", "Register Exam", "Withdraw Request"]



export default class TermsScreen extends React.PureComponent<Props, State> {
    constructor(props: Props) {
        super(props);


        this.state = {

        };


    }

    componentDidMount(): void {

    }

    componentWillUnmount(): void {

    }

    render(): React.ReactNode {
        return (
            <SafeAreaView style={styles.root}>
                <View style={{ padding: 20, flexDirection: "row" }}>
              <Ionicons
                name={"arrow-back"}
                size={25}
                color={Colors.black}
                onPress={() => this.props.navigation.goBack()}
              />
              <Text
                style={{
                  fontSize: 16,
                  marginLeft: 15,
                  fontWeight: "700",
                  color: "black",
                }}
              >
                Terms & Conditions
              </Text>
            </View>

                <ScrollView showsVerticalScrollIndicator={false} >

                    <View style={{ padding: 10 }}>
                        <Text style={styles.content}>Thank you for accessing/shopping at <Text
                            style={styles.hyperlinkStyle}
                            onPress={() => {
                                Linking.openURL('https://student.kracknow.com');
                            }}>
                            https://student.kracknow.com
                        </Text>. This site is owned by Kracknow
                            - (hereinafter referred to as <Text
                                style={styles.hyperlinkStyle}
                                onPress={() => {
                                    Linking.openURL('https://student.kracknow.com');
                                }}>
                                https://student.kracknow.com
                            </Text>). By accessing, shopping on this site, you indicate your
                            unconditional acceptance of these terms & conditions. We reserve this right, in our sole discretion, to
                            update or revise these terms & conditions. Continued use of the site following the posting of any changes
                            to the ‘terms & conditions’, constitutes your acceptance of those changes. At <Text
                                style={styles.hyperlinkStyle}
                                onPress={() => {
                                    Linking.openURL('https://student.kracknow.com');
                                }}>
                                https://student.kracknow.com
                            </Text>, we try
                            our best to create a space where you can explore and shop for all your favorite things in a safe and
                            secure environment. All products and information displayed on <Text
                                style={styles.hyperlinkStyle}
                                onPress={() => {
                                    Linking.openURL('https://student.kracknow.com');
                                }}>
                                https://student.kracknow.com
                            </Text> constitutes an
                            "invitation to offer". <Text
                                style={styles.hyperlinkStyle}
                                onPress={() => {
                                    Linking.openURL('https://student.kracknow.com');
                                }}>
                                https://student.kracknow.com
                            </Text> reserves the right to accept or reject your offer. Your order for
                            purchase, constitutes your "offer" which shall be subject to the terms and conditions as listed below.</Text>

                        <Text style={styles.heading}>1. Eligibility to use our site</Text>

                        <Text style={styles.content}>Use of the Site is available only to persons who can legally enter into contracts under applicable laws.
                            Persons who are "incompetent to contract", within the meaning of the Indian Contract Act, 1872 including
                            un-discharged insolvents etc. are not eligible to use the Site. <Text
                                style={styles.hyperlinkStyle}
                                onPress={() => {
                                    Linking.openURL('https://student.kracknow.com');
                                }}>
                                https://student.kracknow.com
                            </Text> reserves the right to
                            terminate your access to the Site if it discovers that you are under the age of 18 years or suffers from any
                            other disability, as recognized under Indian Contract Act, 1872.
                        </Text>

                        <Text style={styles.heading}>2. Membership</Text>

                        <Text style={styles.content}>Although it's not essential to have an account to shop with <Text
                            style={styles.hyperlinkStyle}
                            onPress={() => {
                                Linking.openURL('https://student.kracknow.com');
                            }}>
                            https://student.kracknow.com
                        </Text>, you can shop as a
                            guest. As a member, you agree to provide true, accurate, current, and complete information about
                            yourself as prompted by the site's registration form. Registration where prohibited under any law shall be
                            void. <Text
                                style={styles.hyperlinkStyle}
                                onPress={() => {
                                    Linking.openURL('https://student.kracknow.com');
                                }}>
                                https://student.kracknow.com
                            </Text> reserves the right to revoke or terminate your registration for any reason at any
                            time, without notice. </Text>

                        <Text style={styles.heading}>3. Electronic Communications</Text>

                        <Text style={styles.content}>
                            When you use the site or send emails or other data, information or communicate to us, you agree and
                            understand that you are communicating with us electronically and give your consent to receive
                            communications electronically from us periodically, when required.
                        </Text>

                        <Text style={styles.heading}>4. Reviews, Feedback, Submissions</Text>

                        <Text style={styles.content}>All reviews, comments, feedback, postcards, suggestions, ideas, and other submissions disclosed,
                            submitted or offered to <Text
                                style={styles.hyperlinkStyle}
                                onPress={() => {
                                    Linking.openURL('https://student.kracknow.com');
                                }}>
                                https://student.kracknow.com
                            </Text> directly or otherwise disclosed, submitted or offered in
                            connection with your use of this Site (collectively referred to "Comments") will remain <Text
                                style={styles.hyperlinkStyle}
                                onPress={() => {
                                    Linking.openURL('https://student.kracknow.com');
                                }}>
                                https://student.kracknow.com
                            </Text> property. Such disclosure, submission or offer of any comments shall constitute an assignment to <Text
                                style={styles.hyperlinkStyle}
                                onPress={() => {
                                    Linking.openURL('https://student.kracknow.com');
                                }}>
                                https://student.kracknow.com
                            </Text> of all worldwide rights, titles and interests in all copyrights and other intellectual
                            properties in the comments,thus, it exclusively owns all such rights, titles and interests and shall not be
                            limited in any way in its use, commercial or otherwise. <Text
                                style={styles.hyperlinkStyle}
                                onPress={() => {
                                    Linking.openURL('https://student.kracknow.com');
                                }}>
                                https://student.kracknow.com
                            </Text> will be entitled to use,
                            reproduce, disclose, modify, adapt, create derivative works from, publish, display and distribute any
                            comments you submit for any purpose whatsoever, without restriction and without compensating you in
                            any way. <Text
                                style={styles.hyperlinkStyle}
                                onPress={() => {
                                    Linking.openURL('https://student.kracknow.com');
                                }}>
                                https://student.kracknow.com
                            </Text> is and shall be under no obligation (1) to maintain any Comments in
                            confidence; or (2) to pay you any compensation for any Comments; or (3) to respond to any Comments.
                            You agree that any comments submitted by you to the Site will not violate this policy or any right of any
                            third party, including copyright, trademark, privacy or other personal or proprietary right(s), and will not
                            cause injury to any person or entity. You further agree that no comments submitted by you to the site will
                            be libelous or otherwise unlawful, threatening, abusive or obscene material, or contain software viruses,
                            political campaigning, commercial solicitation, chain letters, mass mailings or any form of "spam".
                            <Text
                                style={styles.hyperlinkStyle}
                                onPress={() => {
                                    Linking.openURL('https://student.kracknow.com');
                                }}>
                                https://student.kracknow.com
                            </Text> does not regularly review posted comments, but does reserve the right (but not the
                            obligation) to monitor and edit or remove any comment submitted to the Site. You grant <Text
                                style={styles.hyperlinkStyle}
                                onPress={() => {
                                    Linking.openURL('https://student.kracknow.com');
                                }}>
                                https://student.kracknow.com
                            </Text> the right to use the name that you submit in connection with any of the posted comments. You agree
                            not to use a false email address, impersonate any person or entity, or otherwise mislead as to the origin
                            of any Comments you submit. You are and shall remain solely responsible for the content of any
                            comments you make and you agree to indemnify <Text
                                style={styles.hyperlinkStyle}
                                onPress={() => {
                                    Linking.openURL('https://student.kracknow.com');
                                }}>
                                https://student.kracknow.com
                            </Text> and its affiliates for all claims
                            resulting from any Comments you submit, we take no responsibility and assume no liability for any
                            comments submitted by you or any third party.</Text>

                        <Text style={styles.heading}>5. Accuracy of Content/ Information of Products on the Web Site </Text>

                        <Text style={styles.content}>While <Text
                            style={styles.hyperlinkStyle}
                            onPress={() => {
                                Linking.openURL('https://student.kracknow.com');
                            }}>
                            https://student.kracknow.com
                        </Text> strives to provide accurate product and pricing information, typographical
                            errors may occur. In the event that a product is listed at an incorrect price or with incorrect information
                            due to an error in pricing or product information, <Text
                                style={styles.hyperlinkStyle}
                                onPress={() => {
                                    Linking.openURL('https://student.kracknow.com');
                                }}>
                                https://student.kracknow.com
                            </Text> shall have the right, on our sole
                            discretion, to modify the price of the products, or information of the products or to refuse or cancel any
                            orders placed for that product, unless the product has already been dispatched. In the event.
                        </Text>

                        <Text style={styles.heading}>Return</Text>
                        <Text style={styles.content}>Product must be returned to us within 30 days from the date it has been delivered to the customer.
                            Product must be returned with all tags attached in its original condition along with all packing material,
                            courier receipt, invoice & other papers.</Text>

                        <Text style={styles.heading}>Refund</Text>
                        <Text style={styles.content}>Once the Product is received to the company successfully, <Text
                            style={styles.hyperlinkStyle}
                            onPress={() => {
                                Linking.openURL('https://student.kracknow.com');
                            }}>
                            https://student.kracknow.com
                        </Text> will instantly initiate the
                            refund to your source account or chosen method of refund within 30 working days.</Text>

                        <Text style={styles.heading}>Refund and Cancellation for Service Provider Company</Text>
                        <Text style={styles.content}>Due to service providers in nature “NO REFUND”,“NO CANCELLATION” will be entertained once the
                            Payment has been made.</Text>

                        <Text style={styles.heading}>Cancellation Policy</Text>
                        <Text style={styles.content}>Please note an order can only be canceled within 24 hours of placing the order. Once the order is
                            processed after 24 hours, no cancellation request will be entertained.However return is possible for all
                            orders/products.</Text>
                        <Text style={styles.content}>OR</Text>
                        <Text style={styles.content}>Customers can CANCEL order only before the Order has been shipped/Dispatched. After the Product/s
                            have been shipped, The Customer CANNOT Cancel the Orders. However return is possible for all
                            orders/products.</Text>


                        <Text style={styles.heading}>Shipping & Delivery Policies</Text>
                        <Text style={styles.content}>Kracknow ships its products to almost all parts of India. Orders placed will be shipped within
                            24* hrs. We ship on all days except Sunday and National Holidays.
                            For all areas serviced by reputed couriers, the delivery time would be within 3 to 4 business days of
                            shipping (business days exclude Sundays and other holidays). For other areas the products will be
                            shipped through --------------- and may take 1-2 weeks depending on location. At times there might be
                            unexpected delays in the delivery of your order due to unavoidable and undetermined logistics
                            challenges beyond our control for which Kracknow is not liable and would request its users to
                            cooperate as Kracknow continuously tries to nought such instances. Also, Kracknow
                            reserves the right to cancel your order at its sole discretion in cases where it takes longer than usual
                            delivery time or the shipment is physically untraceable and refund the amount paid for cancelled
                            product(s) to your source account.</Text>


                        <Text style={styles.heading}>Contact Us</Text>
                        






                    </View>

                    {/* <View style={{ padding: 10 }}>

                        <Text style={styles.heading}>1. Kracknow</Text>
                        <Text style={styles.content}>Kracknow is the flagship brand of one love. Through kracknow, along with its sub-pages, and the
                            kracknow App, website. kracknow operates five separate portals through which it offers knowledge online
                            games. Kracknow as used herein shall be construed as a collective reference to Kracknow and the
                            Kracknow App.
                        </Text>

                        <Text style={styles.heading}>2. Usage of Kracknow</Text>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>Any person "User" accessing Kracknow web or the Kracknow App ('Kracknow platform') for
                                participating in the various contests and games , available on Kracknow platform (&quot;Contest(s)&quot;)
                                (&#39;Kracknow Services&#39;) shall be bound by these Terms and Conditions, and all other rules, regulations and
                                terms of use referred to herein or provided by Kracknow in relation to any Kracknow Services.
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>Kracknow shall be entitled to modify these Terms and Conditions, rules, regulations and terms of use
                                referred to herein or provided by Kracknow in relation to any Kracknow Services, at any time, by posting
                                the same on Kracknow. Use of Kracknow constitutes the User&#39;s acceptance of such Terms and
                                Conditions, rules, regulations and terms of use referred to herein or provided by Kracknow in relation to
                                any Kracknow Services, as may be amended from time to time. Kracknow may, at its sole discretion, also
                                notify the User of any change or modification in these Terms and Conditions, rules, regulations and terms
                                of use referred to herein or provided by Kracknow, by way of sending an email to the User&#39;s registered
                                email address or posting notifications in the User accounts. The User may then exercise the options
                                provided in such an email or notification to indicate non-acceptance of the modified Terms and
                                Conditions, rules, regulations and terms of use referred to herein or provided by Kracknow. If such
                                options are not exercised by the User within the time frame prescribed in the email or notification, the
                                User will be deemed to have accepted the modified Terms and Conditions, rules, regulations and terms of
                                use referred to herein or provided by Kracknow
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>Certain Kracknow Services being provided on Kracknow may be subject to additional rules and
                                regulations set down in that respect. To the extent that these Terms and Conditions are inconsistent with
                                the additional conditions set down, the additional conditions shall prevail
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>Kracknow may, at its sole and absolute discretion:
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2022'} </Text>
                            <Text style={styles.content}>Restrict, suspend, or terminate any User&#39;s access to all or any part of Kracknow or Kracknow Platform
                                Services;
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2022'} </Text>
                            <Text style={styles.content}>Change, suspend, or discontinue all or any part of the Kracknow Platform Services;
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2022'} </Text>
                            <Text style={styles.content}>Reject, move, or remove any material that may be submitted by a User;
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2022'} </Text>
                            <Text style={styles.content}>Move or remove any content that is available on Kracknow Platform;
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2022'} </Text>
                            <Text style={styles.content}>Deactivate or delete a User&#39;s account and all related information and files on the account;
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2022'} </Text>
                            <Text style={styles.content}>Establish general practices and limits concerning use of Kracknow Platform;
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2022'} </Text>
                            <Text style={styles.content}>Offer discounts to its users in form it deems fit (&quot;Cash Bonus&quot;). All such discounts shall be credited in
                                a separate account called as Cash Bonus Account
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2022'} </Text>
                            <Text style={styles.content}>Revise or make additions and/or deletions to the roster of players available for selection in a Contest on
                                account of revisions to the roster of players involved in the relevant Event;
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2022'} </Text>
                            <Text style={styles.content}>Assign its rights and liabilities to all User accounts hereunder to any entity (post such assignment
                                intimation of such assignment shall be sent to all Users to their registered email ids)
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>In the event any User breaches, or Kracknow reasonably believes that such User has breached these
                                Terms and Conditions, or has illegally or improperly used Kracknow or the Kracknow Services, Kracknow
                                may, at its sole and absolute discretion, and without any notice to the User, restrict, suspend or terminate
                                such User&#39;s access to all or any part of Kracknow Contests or the Kracknow Platform, deactivate or
                                delete the User&#39;s account and all related information on the account, delete any content posted by the
                                User on Kracknow and further, take technical and legal steps as it deems necessary
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>If Kracknow charges its Users a platform fee in respect of any Kracknow Services, Kracknow shall,
                                without delay, repay such platform fee in the event of suspension or removal of the User&#39;s account or
                                Kracknow Services on account of any negligence or deficiency on the part of Kracknow, but not if such
                                suspension or removal is effected due to:
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2022'} </Text>
                            <Text style={styles.content}>any breach or inadequate performance by the User of any of these Terms and Conditions; or
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2022'} </Text>
                            <Text style={styles.content}> any circumstances beyond the reasonable control of Kracknow.
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>Users consent to receiving communications such as announcements, administrative messages and
                                advertisements from Kracknow or any of its partners, licensors or associates.
                            </Text>
                        </View>

                        <Text style={styles.heading}>3. Intellectual Property</Text>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>Kracknow includes a combination of content created by Kracknow, its partners, affiliates, licensors,
                                associates and/or Users. The intellectual property rights (&quot;Intellectual Property Rights&quot;) in all
                                software underlying Kracknow and the Kracknow Platform and material published on Kracknow, including
                                (but not limited to) games, Contests, software, advertisements, written content, photographs, graphics,
                                images, illustrations, marks, logos, audio or video clippings and Flash animation, is owned by Kracknow,
                                its partners, licensors and/or associates. Users may not modify, publish, transmit, participate in the
                                transfer or sale of, reproduce, create derivative works of, distribute, publicly perform, publicly display, or in
                                any way exploit any of the materials or content on Kracknow either in whole or in part without express
                                written license from Kracknow
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>Users may request permission to use any Kracknow content by writing in to  Kracknow Helpdesk .
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>Users are solely responsible for all materials (whether publicly posted or privately transmitted) that they
                                upload, post, e-mail, transmit, or otherwise make available on Kracknow (&quot;Users&#39; Content&quot;). Each
                                User represents and warrants that he/she owns all Intellectual Property Rights in the User&#39;s Content and
                                that no part of the User&#39;s Content infringes any third party rights. Users further confirm and undertake to
                                not display or use of the names, logos, marks, labels, trademarks, copyrights or intellectual and
                                proprietary rights of any third party on Kracknow. Users agree to indemnify and hold harmless Kracknow,
                                its directors, employees, affiliates and assigns against all costs, damages, loss and harm including
                                towards litigation costs and counsel fees, in respect of any third party claims that may be initiated
                                including for infringement of Intellectual Property Rights arising out of such display or use of the names,
                                logos, marks, labels, trademarks, copyrights or intellectual and proprietary rights on Kracknow, by such
                                User or through the User&#39;s commissions or omissions
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>Users hereby grant to Kracknow and its affiliates, partners, licensors and associates a worldwide,
                                irrevocable, royalty-free, non-exclusive, sub-licensable license to use, reproduce, create derivative works
                                of, distribute, publicly perform, publicly display, transfer, transmit, and/or publish Users&#39; Content for any of
                                the following purposes:
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2022'} </Text>
                            <Text style={styles.content}>displaying Users&#39; Content on Kracknow
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2022'} </Text>
                            <Text style={styles.content}>distributing Users&#39; Content, either electronically or via other media, to other Users seeking to download or
                                otherwise acquire it, and/or
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2022'} </Text>
                            <Text style={styles.content}>storing Users&#39; Content in a remote database accessible by end users, for a charge.
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2022'} </Text>
                            <Text style={styles.content}>This license shall apply to the distribution and the storage of Users&#39; Content in any form, medium, or
                                technology.
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>All names, logos, marks, labels, trademarks, copyrights or intellectual and proprietary rights on
                                Kracknow(s) belonging to any person (including User), entity or third party are recognized as proprietary
                                to the respective owners and any claims, controversy or issues against these names, logos, marks,
                                labels, trademarks, copyrights or intellectual and proprietary rights must be directly addressed to the
                                respective parties under notice to Kracknow.
                            </Text>
                        </View>

                        <Text style={styles.heading}>4. Third Party Sites, Services and Products</Text>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>Kracknow may contain links to other Internet sites owned and operated by third parties. Users&#39; use of
                                each of those sites is subject to the conditions, if any, posted by the sites. Kracknow does not exercise
                                control over any Internet sites apart from Kracknowand cannot be held responsible for any content
                                residing in any third-party Internet site. Kracknow&#39;s inclusion of third-party content or links to third-party
                                Internet sites is not an endorsement by Kracknow of such third-party Internet site.
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>Users&#39; correspondence, transactions/offers or related activities with third parties, including payment
                                providers and verification service providers, are solely between the User and that third party. Users&#39;
                                correspondence, transactions and usage of the services/offers of such third party shall be subject to the
                                terms and conditions, policies and other service terms adopted/implemented by such third party, and the
                                User shall be solely responsible for reviewing the same prior to transacting or availing of the
                                services/offers of such third party. User agrees that Kracknow will not be responsible or liable for any loss
                                or damage of any sort incurred as a result of any such transactions/offers with third parties. Any
                                questions, complaints, or claims related to any third party product or service should be directed to the
                                appropriate vendor.
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>Kracknow contains content that is created by Kracknow as well as content provided by third parties.
                                Kracknow does not guarantee the accuracy, integrity, quality of the content provided by third parties and
                                such content may not relied upon by the Users in utilizing the Kracknow Services provided on Kracknow
                                including while participating in any of the contests hosted on Kracknow.
                            </Text>
                        </View>

                        <Text style={styles.heading}>5. Privacy Policy</Text>
                        <Text style={styles.content}>All information collected from Users, such as registration and credit card information, is subject to
                            Kracknow&#39;s Privacy Policy which is available at Privacy Policy
                        </Text>

                        <Text style={styles.heading}>6. User Conduct</Text>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>Users agree to abide by these Terms and Conditions and all other rules, regulations and terms of use of
                                the Website. In the event User does not abide by these Terms and Conditions and all other rules,
                                regulations and terms of use, Kracknow may, at its sole and absolute discretion, take necessary remedial
                                action, including but not limited to:
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2022'} </Text>
                            <Text style={styles.content}>restricting, suspending, or terminating any User&#39;s access to all or any part of Kracknow Services;
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2022'} </Text>
                            <Text style={styles.content}>deactivating or deleting a User&#39;s account and all related information and files on the account. Any amount
                                remaining unused in the User&#39;s Game account or Winnings Account on the date of deactivation or
                                deletion shall be transferred to the User&#39;s bank account on record with Kracknow subject to a processing
                                fee (if any) applicable on such transfers as set out herein; or
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2022'} </Text>
                            <Text style={styles.content}>refraining from awarding any prize(s) to such User.
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>Users agree to provide true, accurate, current and complete information at the time of registration and at
                                all other times (as required by Kracknow). Users further agree to update and keep updated their
                                registration information
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>A User shall not register or operate more than one User account with Kracknow.
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>Users agree to ensure that they can receive all communication from Kracknow by marking e-mails or
                                sending SMSs from Kracknow as part of their &quot;safe senders&quot; list. Kracknow shall not be held liable if any
                                e-mail/SMS remains unread by a User as a result of such e-mail getting delivered to the User&#39;s junk or
                                spam folder.
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>Any password issued by Kracknow to a User may not be revealed to anyone else. Users may not use
                                anyone else&#39;s password. Users are responsible for maintaining the confidentiality of their accounts and
                                passwords. Users agree to immediately notify Kracknow of any unauthorized use of their passwords or
                                accounts or any other breach of security.
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>Users agree to exit/log-out of their accounts at the end of each session. Kracknow shall not be
                                responsible for any loss or damage that may result if the User fails to comply with these requirements.
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>Users agree not to use cheats, exploits, automation, software, bots, hacks or any unauthorised third party
                                software designed to modify or interfere with Kracknow Services and/or Kracknow experience or assist in
                                such activity.
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>Users agree not to copy, modify, rent, lease, loan, sell, assign, distribute, reverse engineer, grant a
                                security interest in, or otherwise transfer any right to the technology or software underlying Kracknow or
                                Kracknow’s Services.
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>Users agree that without Kracknow&#39;s express written consent, they shall not modify or cause to be
                                modified any files or software that are part of Kracknow&#39;s Services.
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>Users agree not to disrupt, overburden, or aid or assist in the disruption or overburdening of (a) any
                                computer or server used to offer or support Kracknow or the Kracknow’s Services (each a &quot;Server&quot;); or
                                (2) the enjoyment of Kracknow Services by any other User or person.
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>Users agree not to institute, assist or become involved in any type of attack, including without limitation to
                                distribution of a virus, denial of service, or other attempts to disrupt Kracknow Services or any other
                                person&#39;s use or enjoyment of Kracknow Services.
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>Users shall not attempt to gain unauthorised access to the User accounts, Servers or networks connected
                                to Kracknow Services by any means other than the User interface provided by Kracknow, including but
                                not limited to, by circumventing or modifying, attempting to circumvent or modify, or encouraging or
                                assisting any other person to circumvent or modify, any security, technology, device, or software that
                                underlies or is part of Kracknow Services.
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>User shall not to publish any content that is patently false and untrue, and is written or published in any
                                form, with the intent to mislead or harass a person, entity or agency for financial gain or to cause any
                                injury to any person.
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>Without limiting the foregoing, Users agree not to use Kracknow for any of the following:
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2022'} </Text>
                            <Text style={styles.content}>To engage in any obscene, offensive, indecent, racial, communal, anti-national, objectionable,
                                defamatory or abusive action or communication;
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2022'} </Text>
                            <Text style={styles.content}>To harass, stalk, threaten, or otherwise violate any legal rights of other individuals;
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2022'} </Text>
                            <Text style={styles.content}>To publish, post, upload, e-mail, distribute, or disseminate (collectively, &quot;Transmit&quot;) any inappropriate,
                                profane, defamatory, infringing, obscene, indecent, or unlawful content;
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2022'} </Text>
                            <Text style={styles.content}>To Transmit files that contain viruses, corrupted files, or any other similar software or programs that may
                                damage or adversely affect the operation of another person&#39;s computer, Kracknow, any software,
                                hardware, or telecommunications equipment;
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2022'} </Text>
                            <Text style={styles.content}>To advertise, offer or sell any goods or services for any commercial purpose on Kracknow without the
                                express written consent of Kracknow;
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2022'} </Text>
                            <Text style={styles.content}>To download any file, recompile or disassemble or otherwise affect our products that you know or
                                reasonably should know cannot be legally obtained in such manner;
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2022'} </Text>
                            <Text style={styles.content}>To falsify or delete any author attributions, legal or other proper notices or proprietary designations or
                                labels of the origin or the source of software or other material;
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2022'} </Text>
                            <Text style={styles.content}>To restrict or inhibit any other user from using and enjoying any public area within our sites;
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2022'} </Text>
                            <Text style={styles.content}>To collect or store personal information about other Users;
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2022'} </Text>
                            <Text style={styles.content}>To interfere with or disrupt Kracknow, servers, or networks;
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2022'} </Text>
                            <Text style={styles.content}>To impersonate any person or entity, including, but not limited to, a representative of Kracknow, or falsely
                                state or otherwise misrepresent User&#39;s affiliation with a person or entity;
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2022'} </Text>
                            <Text style={styles.content}>To forge headers or manipulate identifiers or other data in order to disguise the origin of any content
                                transmitted through Kracknow or to manipulate User&#39;s presence on Kracknow(s);
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2022'} </Text>
                            <Text style={styles.content}>To take any action that imposes an unreasonably or disproportionately large load on our infrastructure;
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2022'} </Text>
                            <Text style={styles.content}>To engage in any illegal activities. You agree to use our bulletin board services, chat areas, news groups,
                                forums, communities and/or message or communication facilities (collectively, the &quot;Forums&quot;) only to send
                                and receive messages and material that are proper and related to that particular Forum.
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2022'} </Text>
                            <Text style={styles.content}>To engage in any action that threatens the unity, integrity, defence, security or sovereignty of India,
                                friendly relations with foreign States, or public order, or causes incitement to the commission of any
                                cognisable offence or prevents investigation of any offence or is insulting other nation.
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>If a User chooses a username that, in Kracknow&#39;s considered opinion is obscene, indecent, abusive or
                                that might subject Kracknow to public disparagement or scorn, or a name which is an official
                                team/league/franchise names and/or name of any sporting personality, as the case may be, Kracknow
                                reserves the right, without prior notice to the User, to restrict usage of such names, which in Kracknow’s
                                opinion fall within any of the said categories and/or change such username and intimate the User or
                                delete such username and posts from Kracknow, deny such User access to Kracknow, or any
                                combination of these options.
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>Unauthorized access to Kracknow is a breach of these Terms and Conditions, and a violation of the law.
                                Users agree not to access Kracknow by any means other than through the interface that is provided by
                                Kracknow for use in accessing Kracknow. Users agree not to use any automated means, including,
                                without limitation, agents, robots, scripts, or spiders, to access, monitor, or copy any part of our sites,
                                except those automated means that we have approved in advance and in writing.
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>Use of Kracknow is subject to existing laws and legal processes. Nothing contained in these Terms and
                                Conditions shall limit Kracknow&#39;s right to comply with governmental, court, and law-enforcement requests
                                or requirements relating to Users&#39; use of Kracknow.
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>Users may reach out to Kracknow through -
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2022'} </Text>
                            <Text style={styles.content}>Helpdesk if the user has any concerns with regard to a match and/or contest within Forty Eight (48) hours
                                of winner declaration for the concerned contest.
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>Persons below the age of eighteen (18) years are not allowed to participate on any of the contests,
                                games (by whatever name called) on the Kracknow Platform. The Users will have to disclose their real
                                age at the time of getting access into the Kracknow Platform.
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>Kracknow may not be held responsible for any content contributed by Users on the Kracknow.
                            </Text>
                        </View>

                        <Text style={styles.heading}>7. Conditions of Participation</Text>

                        <Text style={styles.content}>By entering a Contest, user agrees to be bound by these Terms and the decisions of Kracknow. Subject
                            to the terms and conditions stipulated herein below, the Company, at its sole discretion, may disqualify
                            any user from a Contest, refuse to award benefits or prizes and require the return of any prizes, if the
                            user engages in unfair conduct, which the Company deems to be improper, unfair or otherwise adverse to
                            the operation of the Contest or is in any way detrimental to other Users which includes, but is not limited
                            to:
                        </Text>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>Falsifying ones’ own personal information (including, but not limited to, name, email address, bank
                                account details and/or any other information or documentation as may be requested by Kracknow to enter
                                a contest and/or claim a prize/winning.;
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>Engaging in any type of financial fraud or misrepresentation including unauthorized use of credit/debit
                                instruments, payment wallet accounts etc. to enter a Contest or claim a prize. It is expressly clarified that
                                the onus to prove otherwise shall solely lie on the user.;
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>Colluding with any other user(s) or engaging in any type of syndicate play;
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>Any violation of Contest rules or the Terms of Use;
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>Accumulating points or prizes through unauthorized methods such as automated bots, or other
                                automated means;
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>Using automated means (including but not limited to harvesting bots, robots, parser, spiders or screen
                                scrapers) to obtain, collect or access any information on the Website or of any User for any purpose
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>Any type of Cash Bonus misuse, misuse of the Invite Friends program, or misuse of any other offers or
                                promotions;
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>Tampering with the administration of a Contest or trying to in any way tamper with the computer programs
                                or any security measure associated with a Contest;
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>Obtaining other users’ information without their express consent and/or knowledge and/or spamming
                                other users (Spamming may include but shall not be limited to send unsolicited emails to users, sending
                                bulk emails to Kracknow Users, sending unwarranted email content either to selected Users or in bulk); or
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>Abusing the Website in any way (‘unparliamentary language, slangs or disrespectful words’ are some of
                                the examples of Abuse)
                                It is clarified that in case a User is found to be in violation of this policy, Kracknow reserves its right to
                                initiate appropriate Civil/Criminal remedies as it may be advised other than forfeiture and/or recovery of
                                prize money if any.
                            </Text>
                        </View>


                        <Text style={styles.heading}>8. Registration for a contest</Text>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>In order to register for the Contest(s), Participants are required to accurately provide the following
                                information:
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2022'} </Text>
                            <Text style={styles.content}>Full Name
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2022'} </Text>
                            <Text style={styles.content}>Team Name(s)
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2022'} </Text>
                            <Text style={styles.content}>E-mail address
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2022'} </Text>
                            <Text style={styles.content}>Password
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2022'} </Text>
                            <Text style={styles.content}>State of Residence
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2022'} </Text>
                            <Text style={styles.content}>Gender
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2022'} </Text>
                            <Text style={styles.content}>Date of birth
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>Participants are also required to confirm that they have read, and shall abide by, these Terms and
                                Conditions.
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>Once the Participants have entered the above information, and clicked on the &quot;register&quot; tab, and such
                                Participants are above the age of 14 years, they are sent an email confirming their registration and
                                containing their login information.
                            </Text>
                        </View>

                        <Text style={styles.heading}>9. Contest(s), Participation and Prizes</Text>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>As part of its services, Kracknow may make available the contest(s) on the Kracknow platform.
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>Currently, following contests are made available on Kracknow platform: 1)quizes, 2) mock test 3. School
                                based exam which are involved in the real-life. Kracknow offers its platform to Participants for
                                quiz/mocktest/exams Contest(s) being created relating to each field , and Participants can participate in
                                such Contest(s) with their Teams.
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2022'} </Text>
                            <Text style={styles.content}>Kracknow reserves the right to abandon a specific round or adjust the deadline of a round in certain
                                specific, uncertain scenarios, which are beyond Kracknow’s reasonable control, including but not limited
                                to the ones’ mentioned herein below:
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2022'} </Text>
                            <Text style={styles.content}>Kracknow reserves the right to adjust the deadline to a maximum of 10 minutes post actual game start
                                time. In case the actual match start time is more than 10 minutes of official deadline, the contest will be
                                abandoned.
                            </Text>
                        </View>

                        <Text style={styles.heading}>Actual match start time is after the official deadline:</Text>

                        <Text style={styles.content}>Kracknow reserves the right to extend the deadline or abandon the contest/game based on the
                            circumstances such as delayed toss, interruption on account of weather, non-appearance of teams,
                            technical/equipment glitches causing delays etc.
                        </Text>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>Kracknow shall endeavor to send communications through emails and/or SMS communication, about any
                                such change as is contemplated in the aforementioned paragraphs to keep the User updated.
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>The Contest(s) across the Kracknow Services shall, in addition to the Terms and Conditions, rules and
                                regulations mentioned herein, be governed by: how to play quiz/mocktes/exms
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2022'} </Text>
                            <Text style={styles.content}>Other rules and regulations (including rules and regulation in relation to any payments made to participate
                                in the Contest(s); and all Participants agree to abide by the same.
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>Currently, there are paid versions of the Contest(s) made available on Kracknow platform. Users may
                                participate in the Contest(s) by paying the pre-designated amount as provided on the relevant Contest
                                page. The ‘pre-designated amount’ means and includes pre-determined platform fee for accessing
                                Kracknow services and pre-determined participant&#39;’s contribution towards prize money pool. The
                                Participant with the highest aggregate points at the end of the pre-determined match shall be eligible to
                                win a pre-designated prize which is disbursed out of prize money pool, as stated on the relevant
                                Contest(s) page.
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>Participant shall pay a pre-designated amount for participating in the contest(s) being created on the
                                Kracknow platform.
                                In two members and above public contests, where all participants have entered the contest with the exact
                                same teams, including the primary and secondary in such event, contest prize money shall be equally
                                divided amongst all participants and the amount shall be deposited in the Kracknow winning account of all
                                participants and the remaining amount shall be credited in the Cash Bonus account of such participants.
                                In the event a user is found to be violating this policy, the Company reserves the right to initiate
                                appropriate action against such users as it deems fit, which shall also include forfeiture of the Cash
                                Bonus Amount.
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>In starting line you will be liable to select primary and secondary option and on that bases points will be
                                allotted
                            </Text>
                        </View>

                        <Text style={styles.heading}>10. Contest Formats</Text>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>Currently one formats of contest(s) are made available on Kracknow platform (1) Public Contest where
                                Users can participate in a Contest with other Users without any restriction on participation and (2). A user
                                can enter into a maximum of 500 contest (including both Public contests and Private contests) per match.
                                Any participation in a contest more than 500 shall be automatically prohibited. All rules applicable to
                                Contest(s) as set out herein shall be applicable to both formats of the Contest(s). Users by participating in
                                a Contest(s) hereby authorize Kracknow to appoint a third party/ Trustee/Escrow Agent to manage users
                                funds on users behalf.
                            </Text>
                        </View>

                        <Text style={styles.heading}>Public contest</Text>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2022'} </Text>
                            <Text style={styles.content}>In the Public contest format of the Contest(s), Kracknow may make available the Contest(s) comprising of
                                2 -– 100 Participants or any other pre-designated number of Participants.
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2022'} </Text>
                            <Text style={styles.content}>Kracknow may create this format of the Contest(s) as a paid format and the Winner will be determinable
                                at the end of the match as per rule of the contests.
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2022'} </Text>
                            <Text style={styles.content}>The number of Participants required to make the Contest(s) operational will be pre-specified and once the
                                number of Participants in such Contest(s) equals the pre-specified number required for that Contest(s),
                                such Contest(s) shall be operational. In case the number of Participants is less than the pre-specified
                                number at the time of commencement of the match, such Contest(s) will not be operational and the pre-
                                designated amount paid by each Participant shall be returned to the account of such User without any
                                charge or deduction.
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2022'} </Text>
                            <Text style={styles.content}>In certain Contests across the Kracknow Services, designated as “Guaranteed contests”, the Contest(s)
                                shall become operational only when a minimum of two users join a Guaranteed Contest. The pre-
                                specified number of winners to be declared in such Contest(s), even if all available Participant slots (as
                                pre-specified in relation to the Contest(s)) remain unfilled. It is clarified that notwithstanding the activation
                                of such Contest(s), Participants can continue to join such Contest(s) till either (i) all available Participant
                                slots of such Contest(s) are filled or (ii) the match to which the Contest (s) relates commences, whichever
                                is earlier. In the event of shortfall in the number of participants joining the Guaranteed Contest, Kracknow
                                shall continue with such contests and the short fall in the prize pool shall be borne by Kracknow.
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>The Contest (s) described above (across the Kracknow Services) are games of skill as success of
                                Participants depends primarily on their superior knowledge of various educational field By participating in
                                this Contest(s), each Participant acknowledges and agrees that he/she is participating in a game of skill.
                            </Text>
                        </View>

                        <Text style={styles.heading}>11. Eligibility</Text>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>The Contest(s) are open only to persons above the age of 18 years.
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>The Contest(s) are open only to persons, currently residing in India.
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>Kracknow may, in accordance with the laws prevailing in certain Indian states, bar individuals residing in
                                those states from participating in the Contest(s). Currently, individuals residing in the Indian states of
                                Andhra Pradesh, Assam, Nagaland, Odisha, Sikkim or Telangana may not participate in the paid version
                                of the Contest as the laws of these states are unclear/ bar persons from participating in games of skill
                                where participants are required to pay to enter.
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>Persons who wish to participate must have a valid email address.
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>Kracknow may on receipt of information bar a person from participation and/or withdrawing winning
                                amounts if such person is found to be one with insider knowledge of participating teams in any given
                                contests/match, organizing boards, leagues etc.
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>Only those Participants who have successfully registered on the Kracknow as well as registered prior to
                                each match in accordance with the procedure outlined above shall be eligible to participate in the Contest
                                and win prizes.
                            </Text>
                        </View>

                        <Text style={styles.heading}>12. Payment Terms</Text>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>In respect of any transactions entered into on the Kracknow platform, including making a payment to
                                participate in the paid versions of Contest(s), Users agree to be bound by the following payment terms:
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2022'} </Text>
                            <Text style={styles.content}>The payment of pre-designated amount Users make to participate in the Contest(s) is inclusive of the pre-
                                designated platform fee for access to the Kracknow Services charged by Kracknow and pre-determined
                                participant’s contribution towards prize money pool.
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2022'} </Text>
                            <Text style={styles.content}>Subject to these Terms and Conditions, all amounts collected from the User are held in a separate non-
                                interest earning bank Accounts. The said accounts are operated by a third party appointed by Kracknow
                                in accordance with Clause 10 of these Terms and Conditions. From these bank accounts, the payouts
                                can be made to (a) Users (towards their withdrawals), (b) Kracknow (towards its Platform Fees) and to (c)
                                Government (towards TDS on Winnings Amount). Kracknow receives only its share of the platform Fees
                                through the said Escrow Agent.
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2022'} </Text>
                            <Text style={styles.content}>The Kracknow reserves the right to charge a Platform Fee, which would be specified and notified by
                                Kracknow on the Contest page, being created on Kracknow platform, prior to a User&#39;s joining of such
                                Contest. The Platform Fee (inclusive of applicable tax thereon) will be debited from the User’s account
                                balance and Kracknow shall issue an invoice for such debit to the User.
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2022'} </Text>
                            <Text style={styles.content}>The User may participate in a Contest wherein the User has to contribute a pre-specified contribution
                                towards the Prize Money Pool of such Contest, which will be passed on to the Winner(s) of the Contest
                                after the completion of the Contest as per the terms and conditions of such Contest. It is clarified that
                                Kracknow has no right or interest in this Prize Money Pool, and only acts as an intermediary engaged in
                                collecting and distributing the Prize Money Pool in accordance with the Contest terms and conditions. The
                                amount to be paid-in by the User towards the Prize Money Pool would also be debited from the User’s
                                account balance maintained with the Trustee.
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2022'} </Text>
                            <Text style={styles.content}>Any user availing Kracknow services are provided with two categories of accounts for the processing and
                                reconciliation of payments: (i) &#39;Unutilized&#39; Account, (ii) Winnings Account. It is clarified that in no instance
                                the transfer of any amounts in the User&#39;s accounts to any other category of account held by the user or
                                any third party account, including a bank account held by a third party:
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2022'} </Text>
                            <Text style={styles.content}>User&#39;s winnings in any Contest will reflect as credits to the User&#39;s Winnings Account.
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2022'} </Text>
                            <Text style={styles.content}>User’s remitting the amount through the designated payment gateway shall be credited to User’s
                                Unutlized Account’.
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2022'} </Text>
                            <Text style={styles.content}>Each time a User participates in any contest on Kracknow platform, the pre-designated amount shall be
                                debited in the User’s account. In debiting amounts from the User’s accounts towards the pre-designated
                                amount of such user shall be debited from the User’s Unutilized Account and thereafter, any remaining
                                amount of participation fee shall be debited from the User’s Winning Account.
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2022'} </Text>
                            <Text style={styles.content}>In case there is any amount remaining to be paid by the User in relation to such User’s participation in
                                any match(s) or Contest(s), the User will be taken to the designated payment gateway to give effect to
                                such payment. In case any amount added by the User through such payment gateway exceeds the
                                remaining amount of the pre-designated amount, the amount in excess shall be transferred to the User’s
                                ‘Unutilized’ Account and will be available for use in participation in any match(s) or Contest(s).
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2022'} </Text>
                            <Text style={styles.content}>Debits from the ‘Unutilized’ Account for the purpose of enabling a user’s participation in a Contest shall be
                                made in order of the date of credit of amounts in the ‘Unutilized’ Account, and accordingly amounts
                                credited into ‘Unutilized’ Account earlier in time shall be debited first.
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2022'} </Text>
                            <Text style={styles.content}>All amounts credited into a User&#39;s &#39;Unutilized&#39; Account must be utilised within 335 days of credit. In case
                                any unutilised amount lies in the &#39;Unutilized&#39; Account after the completion of 335 days from the date of
                                credit of such amount, Kracknow reserves the right to forfeit such unutilised amount, without liability or
                                obligation to pay any compensation to the User.
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2022'} </Text>
                            <Text style={styles.content}>Minimum amount required for any payment to proceed is kept at 200 minimum.
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2022'} </Text>
                            <Text style={styles.content}>Withdrawal of any amount standing to the User&#39;s credit in the Winnings Account may be made by way of
                                a request to Kracknow. Kracknow shall effect an online transfer to the User&#39;s bank account on record with
                                Kracknow within a commercially reasonable period of time. Such transfer will reflect as a debit to the
                                User&#39;s Winnings Account. Kracknow shall not charge any processing fee for the online transfer of such
                                amount from the Winnings Account to the User&#39;s bank account on record with Kracknow. Users are
                                requested to note that they will be required to provide valid photo identification and address proof
                                documents for proof of identity and address in order for Kracknow to process the withdrawal request. The
                                name mentioned on the User&#39;s photo identification document should correspond with the name provided
                                by the User at the time of registration on Kracknow, as well as the name and address existing in the
                                records of the User&#39;s bank account as provided to Kracknow. In the event that no bank account has been
                                registered by the User against such User&#39;s account with Kracknow, or the User has not verified his/her
                                User account with Kracknow, to Kracknow&#39;s satisfaction and in accordance with these Terms and
                                Conditions, and in case the User fails to register a bank account with his/her User Account and/or to
                                verify his/her User Account, Kracknow shall not transfer any Winning amounts to the User.
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2022'} </Text>
                            <Text style={styles.content}>Further, in order to conduct promotional activities, Kracknow may gratuitously issue Cash Bonus to the
                                User for the purpose of participation in any Contest(s) and no User shall be permitted to transfer or
                                request the transfer of any amount in to the Cash Bonus. The usage of any Cash Bonus issued shall be
                                subject to the limitations and restrictions, including without limitation, restrictions as to time within which
                                such Cash Bonus must be used, as applied by Kracknow and notified to the User at the time of issue of
                                such amount. The issue of any Cash Bonus to the user is subject to the sole discretion of Kracknow and
                                cannot be demanded by any User as a matter of right. The issue of any Cash Bonus by Kracknow on any
                                day shall not entitle the user to demand the issuance of such Cash Bonus at any subsequent period in
                                time nor create an expectation of recurring issue of such Cash Bonus by Kracknow to such User. The
                                Cash Bonus granted to the user may be used by such User for the purpose of setting off against the
                                contribution to prize pool in any Contest, in accordance with these Terms and Conditions. The Cash
                                Bonus shall not be withdraw-able or transferrable to any other account of the User, including the bank
                                account of such User, or of any other User or person, other that as part of the winnings of a User in any
                                Contest(s). In case the User terminates his/her account with Kracknow or such account if terminated by
                                Kracknow, all Cash Bonus granted to the user shall return to Kracknow and the User shall not have any
                                right or interest on such points.
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2022'} </Text>
                            <Text style={styles.content}>All Cash Bonus credited in the User account shall be valid for a period of 14 days from the date of credit.
                                The unutilized Cash Bonus shall expire at the end of 14 days from the date of credit.
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2022'} </Text>
                            <Text style={styles.content}>Users agree that once they confirm a transaction on Kracknow, they shall be bound by and make
                                payment for that transaction.
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2022'} </Text>
                            <Text style={styles.content}>The User acknowledges that subject to time taken for bank reconciliations and such other external
                                dependencies that Kracknow has on third parties, any transactions on Kracknow Platform may take up to
                                24 hours to be processed. Any amount paid or transferred into the User&#39;s &#39;Unutilized&#39; Account or Winnings
                                Account may take up to 24 hours to reflect in the User&#39;s &#39;Unutilized&#39; Account or Winnings Account
                                balance. Similarly, the utilization of the Cash Bonus or money debited from &#39;Unutilized&#39; Account or
                                Winnings Account may take up to 24 hours to reflect in the User&#39;s &#39;Unutilized&#39; Account or Winnings
                                Account balance. Users agree not to raise any complaint or claim against Kracknow in respect of any
                                delay, including any lost opportunity to join any Contest or match due to delay in crediting of transaction
                                amount into any of the User&#39;s accounts
                                A transaction, once confirmed, is final and no cancellation is permissible.
                                Kracknow may, in certain exceptional circumstances and at its sole and absolute discretion, refund the
                                amount to the User after deducting applicable cancellation charges and taxes. At the time of the
                                transaction, Users may also be required to take note of certain additional terms and conditions and such
                                additional terms and conditions shall also govern the transaction. To the extent that the additional terms
                                and conditions contain any clause that is conflicting with the present terms and conditions, the additional
                                terms and conditions shall prevail.
                            </Text>
                        </View>

                        <Text style={styles.heading}>13. Selection and Verification of Winners and Conditions relating to the Prizes</Text>

                        <Text style={styles.heading}>Selection of Winners</Text>

                        <Text style={styles.content}>Winners will be decided on the basis of the scores of the persons given correct and wrong in a
                            designated game (which may last anywhere between one day and an entire tournament) of the
                            Contest(s). The Participant(s) owning the Team(s) with the highest aggregate score in a particular match
                            shall be declared the Winner(s). In certain pre-specified Contests, Kracknow may declare more than one
                            Winner and distribute prizes to such Winners in increasing order of their Team&#39;s aggregate score at the
                            end of the designated match of the Contest. The contemplated number of Winners and the prize due to
                            each Winner in such Contest shall be as specified on the Contest page prior to the commencement of the
                            Contest.
                            Participants creating Teams on behalf of any other Participant or person shall be disqualified.
                            In the event of a tie, the winning Participants shall be declared Winners and the prize shall be equally
                            divided among such Participants.
                            Kracknow shall not be liable to pay any prize if it is discovered that the Winner(s) have not abided by
                            these Terms and Conditions, and other rules and regulations in relation to the use of the Kracknow,
                            Contest, &quot;Fantasy Rules&quot;, etc.
                        </Text>

                        <Text style={styles.heading}>Contacting Winners</Text>

                        <Text style={styles.content}>Winners shall be contacted by Kracknow or the third party conducting the Contest on the e-mail address
                            provided at the time of registration. The verification process and the documents required for the collection
                            of prize shall be detailed to the Winners at this stage. As a general practice, winners will be required to
                            provide following documents:
                        </Text>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2022'} </Text>
                            <Text style={styles.content}>Photocopy of the User&#39;s PAN card;
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2022'} </Text>
                            <Text style={styles.content}>Photocopy of a government-issued residence proof;
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2022'} </Text>
                            <Text style={styles.content}>User&#39;s bank account details and proof of the same.
                            </Text>
                        </View>

                        <Text style={styles.content}>Kracknow shall not permit a Winner to withdraw his/her prize(s)/accumulated winnings unless the above-
                            mentioned documents have been received and verified within the time-period stipulated by Kracknow.
                            The User represents and warrants that the documents provided in the course of the verification process
                            are true copies of the original documents to which they relate.
                            Participants are required to provide proper and complete details at the time of registration. Kracknow shall
                            not be responsible for communications errors, commissions or omissions including those of the
                            Participants due to which the results may not be communicated to the Winner.
                            The list of Winners shall be posted on a separate web-page on the Kracknow. The winners will also be
                            intimated by e-mail.
                            In the event that a Participant has been declared a Winner on the abovementioned web-page but has not
                            received any communication from Kracknow, such Participant may contact Kracknow within the time
                            specified on the webpage.</Text>

                        <Text style={styles.heading}>Verification process</Text>

                        <Text style={styles.content}>Only those Winners who successfully complete the verification process and provide the required
                            documents within the time limit specified by Kracknow shall be permitted to withdraw/receive their
                            accumulated winnings (or any part thereof). Kracknow shall not entertain any claims or requests for
                            extension of time for submission of documents.
                            Kracknow shall scrutinize all documents submitted and may, at its sole and absolute discretion, disqualify
                            any Winner from withdrawing his accumulated winnings (or any part thereof) on the following matchs:
                        </Text>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2022'} </Text>
                            <Text style={styles.content}>Determination by Kracknow that any document or information submitted by the Participant is incorrect,
                                misleading, false, fabricated, incomplete or illegible; or
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2022'} </Text>
                            <Text style={styles.content}>Participant does not fulfill the Eligibility Criteria specified in Clause 10 above; or
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2022'} </Text>
                            <Text style={styles.content}>Any other match.
                            </Text>
                        </View>

                        <Text style={styles.heading}>Taxes Payable</Text>

                        <Text style={styles.content}>All prizes shall be subject to deduction of tax (“TDS”) as per the Income Tax Act 1961. The TDS rate
                            prescribed by the Government of India with respect to any prize money amount that is in excess of Rs.
                            10,000/- is 30% . TDS of 30% shall be deducted on Net Winnings ( prize money amount - contest entry
                            amount - cash bonus). In case of any revisions by the Government of India to the aforementioned rate in
                            the future, TDS will be deducted by Kracknow in accordance with the then current prescribed TDS rate.

                            Winners will be provided TDS certificates in respect of such tax deductions. The Winners shall be
                            responsible for payment of any other applicable taxes, including but not limited to, income tax, gift tax,
                            etc. in respect of the prize money.
                        </Text>


                        <Text style={styles.heading}>Miscellaneous</Text>

                        <Text style={styles.content}>The decision of Kracknow with respect to the awarding of prizes shall be final, binding and non-
                            contestable.
                            To the extent permitted by law, Kracknow makes no representations or warranties as to the quality,
                            suitability or merchantability of any prizes and shall not be liable in respect of the same.
                            Kracknow may, at its sole and absolute discretion, vary or modify the prizes being offered to winners.
                            Participants shall not raise any claim against Kracknow or question its right to modify such prizes being
                            offered, prior to closure of the Contest.
                            Kracknow will not bear any responsibility for the transportation or packaging of prizes to the respective
                            winners. Kracknow shall not be held liable for any loss or damage caused to any prizes at the time of
                            such transportation.
                            The Winners shall bear the shipping, courier or any other delivery cost in respect of the prizes.
                            The Winners shall bear all transaction charges levied for delivery of cash prizes.
                            All prizes are non-transferable and non-refundable. Prizes cannot be exchanged / redeemed for cash or
                            kind. No cash claims can be made in lieu of prizes in kind.
                        </Text>

                        <Text style={styles.heading}>14. Publicity</Text>

                        <Text style={styles.content}>Acceptance of a prize by the Winner constitutes permission for Kracknow, and its affiliates to use the
                            Winner&#39;s name, likeness, voice and comments for advertising and promotional purposes in any media
                            worldwide for purposes of advertising and trade without any further permissions or consents and / or
                            additional compensation whatsoever.
                            The Winners further undertake that they will be available for promotional purposes as planned and
                            desired by Kracknow without any charge. The exact dates remain the sole discretion of Kracknow.
                            Promotional activities may include but not be limited to press events, internal meetings and
                            ceremonies/functions.
                        </Text>

                        <Text style={styles.heading}>15. General Conditions</Text>

                        <Text style={styles.content}>If it comes to the notice of Kracknow that any governmental, statutory or regulatory compliances or
                            approvals are required for conducting any Contest(s) or if it comes to the notice of Kracknow that conduct
                            of any such Contest(s) is prohibited, then Kracknow shall withdraw and / or cancel such Contest(s)
                            without prior notice to any Participants or winners of any Contest(s). Users agree not to make any claim in
                            respect of such cancellation or withdrawal of the Contest or Contest it in any manner.
                            Employees, directors, affiliates, relatives and family members of Kracknow, will not be eligible to
                            participate in any Contest(s).
                        </Text>

                        <Text style={styles.heading}>16. Dispute and Dispute Resolution</Text>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>The courts of competent jurisdiction at surat shall have exclusive jurisdiction to determine any and all
                                disputes arising out of, or in connection with, the Kracknow Services provided by Kracknow (including the
                                Contest(s)), the construction, validity, interpretation and enforceability of these Terms and Conditions, or
                                the rights and obligations of the User(s) (including Participants) or Kracknow, as well as the exclusive
                                jurisdiction to grant interim or preliminary relief in case of any dispute referred to arbitration as given
                                below. All such issues and questions shall be governed and construed in accordance with the laws of the
                                Republic of India.
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>In the event of any legal dispute (which may be a legal issue or question) which may arise, the party
                                raising the dispute shall provide a written notification (&quot;Notification&quot;) to the other party. On receipt of
                                Notification, the parties shall first try to resolve the dispute through discussions. In the event that the

                                parties are unable to resolve the dispute within fifteen (15) days of receipt of Notification, the dispute shall
                                be settled by arbitration.
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>The place of arbitration shall be Surat, India. All arbitration proceedings shall be conducted in English and
                                in accordance with the provisions of the Arbitration and Conciliation Act, 1996, as amended from time to
                                time.
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>The arbitration award will be final and binding on the Parties, and each Party will bear its own costs of
                                arbitration and equally share the fees of the arbitrator unless the arbitral tribunal decides otherwise. The
                                arbitrator shall be entitled to pass interim orders and awards, including the orders for specific
                                performance and such orders would be enforceable in competent courts. The arbitrator shall give a
                                reasoned award.
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>Nothing contained in these Terms and Conditions shall prevent Kracknow from seeking and obtaining
                                interim or permanent equitable or injunctive relief, or any other relief available to safeguard Kracknow&#39;s
                                interest prior to, during or following the filing of arbitration proceedings or pending the execution of a
                                decision or award in connection with any arbitration proceedings from any court having jurisdiction to
                                grant the same. The pursuit of equitable or injunctive relief shall not constitute a waiver on the part of
                                Kracknow to pursue any remedy for monetary damages through the arbitration described herein.
                            </Text>
                        </View>

                        <Text style={styles.heading}>17. Release and Limitations of Liability</Text>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>Users shall access the Kracknow Services provided on Kracknow voluntarily and at their own risk.
                                Kracknow shall, under no circumstances be held responsible or liable on account of any loss or damage
                                sustained (including but not limited to any accident, injury, death, loss of property) by Users or any other
                                person or entity during the course of access to the Kracknow Services (including participation in the
                                Contest(s)) or as a result of acceptance of any prize.
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>By entering the contests and accessing the Kracknow Services provided therein, Users hereby release
                                from and agree to indemnify Kracknow, and/ or any of its directors, employees, partners, associates and
                                licensors, from and against all liability, cost, loss or expense arising out their access to the Kracknow
                                Services including (but not limited to) personal injury and damage to property and whether direct, indirect,
                                consequential, foreseeable, due to some negligent act or omission on their part, or otherwise.
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>Kracknow accepts no liability, whether jointly or severally, for any errors or omissions, whether on behalf
                                of itself or third parties in relation to the prizes.
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>Users shall be solely responsible for any consequences which may arise due to their access of Kracknow
                                Services by conducting an illegal act or due to non-conformity with these Terms and Conditions and other
                                rules and regulations in relation to Kracknow Services, including provision of incorrect address or other
                                personal details. Users also undertake to indemnify Kracknow and their respective officers, directors,
                                employees and agents on the happening of such an event (including without limitation cost of attorney,
                                legal charges etc.) on full indemnity basis for any loss/damage suffered by Kracknow on account of such
                                act on the part of the Users.
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>Users shall indemnify, defend, and hold Kracknow harmless from any third party/entity/organization
                                claims arising from or related to such User&#39;s engagement with the Kracknow or participation in any
                                Contest. In no event shall Kracknow be liable to any User for acts or omissions arising out of or related to
                                User&#39;s engagement with the Kracknow or his/her participation in any Contest(s).
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>In consideration of Kracknow allowing Users to access the Kracknow Services, to the maximum extent
                                permitted by law, the Users waive and release each and every right or claim, all actions, causes of
                                actions (present or future) each of them has or may have against Kracknow, its respective agents,
                                directors, officers, business associates, group companies, sponsors, employees, or representatives for all
                                and any injuries, accidents, or mishaps (whether known or unknown) or (whether anticipated or
                                unanticipated) arising out of the provision of Kracknow Services or related to the Contests or the prizes of
                                the Contests.
                            </Text>
                        </View>

                        <Text style={styles.heading}>18. Disclaimers</Text>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>To the extent permitted under law, neither Kracknow nor its parent/holding company, subsidiaries,
                                affiliates, directors, officers, professional advisors, employees shall be responsible for the deletion, the
                                failure to store, the mis-delivery, or the untimely delivery of any information or material.
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>To the extent permitted under law, Kracknow shall not be responsible for any harm resulting from
                                downloading or accessing any information or material, the quality of servers, games, products, Kracknow
                                services or sites, cancellation of competition and prizes. Kracknow disclaims any responsibility for, and if
                                a User pays for access to one of Kracknow&#39;s Services the User will not be entitled to a refund as a result
                                of, any inaccessibility that is caused by Kracknow&#39;s maintenance on the servers or the technology that

                                underlies our sites, failures of Kracknow&#39;s service providers (including telecommunications, hosting, and
                                power providers), computer viruses, natural disasters or other destruction or damage of our facilities, acts
                                of nature, war, civil disturbance, or any other cause beyond our reasonable control. In addition, Kracknow
                                does not provide any warranty as to the content on the Kracknow(s). Kracknow(s) content is distributed
                                on an &quot;as is, as available&quot; basis.
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>Any material accessed, downloaded or otherwise obtained through Kracknow is done at the User&#39;s
                                discretion, competence, acceptance and risk, and the User will be solely responsible for any potential
                                damage to User&#39;s computer system or loss of data that results from a User&#39;s download of any such
                                material.
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>Kracknow shall make best endeavours to ensure that the Kracknow(s) is error-free and secure, however,
                                neither Kracknow nor any of its partners, licensors or associates makes any warranty that:
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2022'} </Text>
                            <Text style={styles.content}>the Kracknow(s) will meet Users&#39; requirements,
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2022'} </Text>
                            <Text style={styles.content}>Kracknow(s) will be uninterrupted, timely, secure, or error free
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2022'} </Text>
                            <Text style={styles.content}>the results that may be obtained from the use of Kracknow(s) will be accurate or reliable; and
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2022'} </Text>
                            <Text style={styles.content}>the quality of any products, Kracknow Services, information, or other material that Users purchase or
                                obtain through Kracknowcom(s) will meet Users&#39; expectations.
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>In case Kracknow discovers any error, including any error in the determination of Winners or in the
                                transfer of amounts to a User&#39;s account, Kracknow reserves the right (exercisable at its discretion) to
                                rectify the error in such manner as it deems fit, including through a set-off of the erroneous payment from
                                amounts due to the User or deduction from the User&#39;s account of the amount of erroneous payment. In
                                case of exercise of remedies in accordance with this clause, Kracknow agrees to notify the User of the
                                error and of the exercise of the remedy(ies) to rectify the same.
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>To the extent permitted under law, neither Kracknow nor its partners, licensors or associates shall be
                                liable for any direct, indirect, incidental, special, or consequential damages arising out of the use of or
                                inability to use our sites, even if we have been advised of the possibility of such damages.
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>Any Kracknow Services, events or Contest(s) being hosted or provided, or intended to be hosted on
                                Kracknow platform and requiring specific permission or authority from any statutory authority or any state
                                or the central government, or the board of directors shall be deemed cancelled or terminated, if such
                                permission or authority is either not obtained or denied either before or after the availability of the relevant
                                Kracknow Services, events or Contest(s) are hosted or provided.
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>To the extent permitted under law, in the event of suspension or closure of any Services, events or
                                Contests, Users (including Participants) shall not be entitled to make any demands, claims, on any nature
                                whatsoever.
                            </Text>
                        </View>

                        <Text style={styles.heading}>19. IBC Kracknow Contest</Text>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>Users participating in the IBC Kracknow Contest hereby agree to be contacted by ICC Business
                                Corporation FZ LLC (“IBC”) for promotion and marketing purposes. User information will only be shared if
                                the user has joined the IBC Kracknow contest. Users personal information shall only be used where
                                General Data Protection Rules allows Kracknow to do so. User may at any time withdraw their consent
                                and request deletion of their personal information by writing to Kracknow Helpdesk and once Kracknow
                                has received the user notification, Kracknow will endeavour to delete or de-identify the user information
                                and will no longer use users personal information unless Kracknow has a legitimate basis for doing so by
                                law.
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>The Participant(s) owning the Team(s) with the highest aggregate score in a particular match shall be
                                declared the Winners. In the event of more than one participating team having the same team score, the
                                Winner will be decided on the basis of points by earned by the captain of such competing team. If the
                                participating team(s) have the same captain, then the participating team with the vice -captain having
                                higher score shall be declared a Winner. In the event of participating team(s) having the same captain
                                and vice-captain, the Winner will be declared based on the Participant submitting their team first.
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>All prizes are non-transferable and non-refundable. Prizes cannot be exchanged / redeemed for cash or
                                kind. No cash claims can be made in lieu of prizes in kind.
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>ICC shall be solely responsible for distribution of prizes for all the IBC Kracknow Contest winners.
                                Kracknow shall not be held responsible for any lapses on part of ICC to give the prizes.
                            </Text>
                        </View>

                        <Text style={styles.heading}>20. Miscellaneous</Text>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>Kracknow may be required under certain legislations, to notify User(s) of certain events. User(s) hereby
                                acknowledge and consent that such notices will be effective upon Kracknow posting them on the
                                Kracknow or delivering them to the User through the email address provided by the User at the time of

                                registration. User(s) may update their email address by logging into their account on the Kracknow. If they
                                do not provide Kracknow with accurate information, Kracknow cannot be held liable for failure to notify the
                                User.
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>Kracknow shall not be liable for any delay or failure to perform resulting from causes outside its
                                reasonable control, including but not limited to any failure to perform due to unforeseen circumstances or
                                cause beyond Kracknow&#39;s control such as acts of God, war, terrorism, riots, embargoes, acts of civil or
                                military authorities, fire, floods, accidents, network infrastructure failures, strikes, or shortages of
                                transportation facilities, fuel, energy, labor or materials. In such circumstances, Kracknow shall also be
                                entitled to cancel any related Contest(s) and to process an appropriate refund for all Participants.
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>Kracknow&#39;s failure to exercise or enforce any right or provision of these Terms and Conditions shall not
                                constitute a waiver of such right or provision.
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>Users agree that regardless of any statute or law to the contrary, any claim or cause of action arising out
                                of or related to use of the Kracknow or these Terms must be filed within thirty (30) days of such claim or
                                cause of action arising or be forever barred.
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>These Terms and Conditions, including all terms, conditions, and policies that are incorporated herein by
                                reference, constitute the entire agreement between the User(s) and Sporta Technologies Private Limited
                                and govern your use of the Kracknow, superseding any prior agreements that any User may have with
                                Sporta Technologies Private Limited.
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>If any part of these Terms and Conditions is determined to be indefinite, invalid, or otherwise
                                unenforceable, the rest of these Terms and Conditions shall continue in full force.
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>Kracknow reserves the right to moderate, restrict or ban the use of the Kracknow, specifically to any User,
                                or generally, in accordance with Kracknow&#39;s policy/policies from time to time, at its sole and absolute
                                discretion and without any notice.
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>Kracknow may, at its sole and absolute discretion, permanently close or temporarily suspend any
                                Kracknow Services (including any Contest(s)).
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>Kracknow may from time to time conduct/organize, promotions/offers on the platform. Any two or more
                                promotions cannot be clubbed together with any other promotions that are running simultaneously on the
                                Kracknow platform. Also, promotions/offers cannot be clubbed with Cash Bonus available with any user.
                            </Text>
                        </View>

                        <Text style={styles.heading}>21. Grievance Redressal Mechanism</Text>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>In case you have any complaints or grievance pertaining to (i) any User Content that you believe violates
                                these Terms (other than an infringement of Intellectual Property Rights) for the reporting mechanism for
                                such claims), (ii) your access to the Platform or (iii) any User Content which you believe is, prima facie, in
                                the nature of any material which is obscene, defamatory towards the complainant or any person on
                                whose behalf you are making the complaint, or is in the nature of impersonation in an electronic form,
                                including artificially morphed images of such individual, please share the same with us by writing
                                to: grievanceofficerKracknow@gmail.com
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>In your complaint or grievance, please include the following information:
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2022'} </Text>
                            <Text style={styles.content}>Your name and contact details: name, address, contact number and email address;
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2022'} </Text>
                            <Text style={styles.content}>Your relation to the subject matter of the complaint, i.e. complainant or person acting on behalf of an
                                affected person;
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2022'} </Text>
                            <Text style={styles.content}>The name and age of the person aggrieved or affected by the subject matter of the complaint, in case
                                your are acting on behalf of such person and a statement, under penalty of perjury, that you are
                                authorised to act on behalf of such person and to provide such person&#39;s personal information to us in
                                relation to the complaint/grievance;
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2022'} </Text>
                            <Text style={styles.content}>Description of the complaint or grievance with clear identification of the User Content in relation to which
                                such complaint or grievance is made;
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2022'} </Text>
                            <Text style={styles.content}>A statement that you believe, in good faith, that the User Content violates these Terms
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2022'} </Text>
                            <Text style={styles.content}>A statement that the information provided in the complaint or grievance is accurate.
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>The Company respects the Intellectual Property Rights of others. All names, logos, marks, labels,
                                trademarks, copyrights or intellectual and proprietary rights on the Platform belonging to any person
                                (including User), entity or third party are recognized as proprietary to the respective owners. You are
                                requested to send us a written notice/ intimation if you notice any act of infringement on the Platform,
                                which must include the following information:
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2022'} </Text>
                            <Text style={styles.content}>A clear identification of the copyrighted work allegedly infringed;
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2022'} </Text>
                            <Text style={styles.content}>A clear identification of the allegedly infringing material on the Platform;
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2022'} </Text>
                            <Text style={styles.content}>Your contact details: name, address, e-mail address and phone number;
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2022'} </Text>
                            <Text style={styles.content}>A statement that you believe, in good faith, that the use of the copyrighted material allegedly infringed on
                                the Platform is not authorized by your agent or the law;
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2022'} </Text>
                            <Text style={styles.content}>A statement that the information provided in the notice is accurate, and under penalty of perjury, that the
                                signatory is authorized to act on behalf of the owner of an exclusive copyright right that is allegedly
                                infringed;
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2022'} </Text>
                            <Text style={styles.content}>Your signature or a signature of your authorized agent.
                                The aforesaid notices can be sent to the Company by email at grievanceofficerKracknow@gmail.com.
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>On receiving such complaint, grievance or notice, the Company reserves the right to investigate and/or
                                take such action as the Company may deem appropriate. The Company may reach out to you to seek
                                further clarification or assistance with the investigation, or verify the statements made in your complaint,
                                grievance or notice, and you acknowledge that your timely assistance with the investigation would
                                facilitate the redressal of the same.
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>The name and title of the Grievance Redressal Officer is as follows:
                                Name: karan bengani
                                Email: grievanceofficerKracknow@gmail.com
                                Address: c-105 shirwad palace bhatar road, surat, Gujarat 395007
                                The Grievance Officer identified above pursuant to the provisions of applicable laws including but not
                                limited to the Information Technology Act, 2000 and the Consumer Protection Act, 2019, and the Rules
                                enacted under those laws.
                                The Company reserves the right to replace the Grievance Redressal Officer at its discretion through
                                publication of the name and title of such replacement on the website, which replacement shall come into
                                effect immediately upon publication.
                            </Text>
                        </View>

                        <Text style={styles.heading}>22. Standard Terms and Conditions of &quot;Invite Friends&quot; program.</Text>

                        <Text style={styles.content}>The Kracknow Invite Friends Program lets you invite friends to join Kracknow (&quot;Program&quot;). In the event
                            that you and your referred friend meet the criteria and complete all the steps specified in these terms, you
                            can earn a Cash Bonus from Kracknow of upto Rs. 500 (&quot;Bonus Amount&quot;), which Bonus Amount will be
                            redeemable to join cash contests and contests through the Kracknow’s mobile application for the iOS
                            and/or Android mobile devices (&quot;Kracknow Application&quot;) and your friend will receive discount coupons
                            worth Rs. 200 ( “Invitee Discount”). To participate in the Program, please note our terms and conditions
                            (&quot;Terms&quot;) in this respect, as they govern your participation in the Program:
                        </Text>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>Eligibility – All users who: (i) have an account registered with Kracknow&#39;s fantasy gaming platform
                                (&quot;Platform&quot;); and (ii) are eligible to participate in the pay-to play game (as per the Kracknow&#39;s terms and
                                conditions, accessible at https://fantasycricket.Kracknow.com/in/termsandconditions); and (iii) have
                                downloaded and installed the Kracknow Application on their respective mobile devices, will be eligible to
                                participate in the Program. Participation in the Program by proxy is not permitted.
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>Participation in the Program is voluntary. A user shall not register or operate more than one user account
                                with Kracknow and shall not participate in the Program with more than one user account with Kracknow.
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>The Program will be open for participation from Indian Standard Time 05:00:00 hours on 17th September,
                                2021 till IST 23:59:59 hours on 31st December, 2022.
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>By participating in the Program, you agree to and accept these Terms.
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>For the purpose of participation in the Program, you are required to have the Kracknow Application
                                downloaded and installed on your mobile device. Through the Kracknow Application, you will be provided
                                with a unique link or code, which can be shared by you (&quot;Inviter&quot;) with friends (each an &quot;Invitee&quot;) for the
                                purpose of inviting such friends to create and register an account with Kracknow and download the
                                Kracknow Application. On receiving the link or code from the Inviter, the Invitee may either: (i) Click on the
                                link, consequent to which such Invitee will be directed to a registration page and will be provided the
                                option to register an account with Kracknow and download and install the Kracknow Application on
                                his/her device; or (ii) download and install the Kracknow Application on his/her device independently,
                                register for a Kracknow account through the Kracknow Application and enter the unique code shared by
                                the Inviter where prompted in the Kracknow Application.
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>The Inviter and the Invitee will be eligible to earn the Bonus Amount subject to (amongst other terms
                                specified in these Terms): (i) the Invitee not being an existing user of Kracknow; and (ii) the Inviter and
                                Invitee being eligible to participate in the pay-to play Kracknow game; and (iii) the Invitee successfully
                                registering for an account with Kracknow through the unique link or by using the unique code shared by
                                the Inviter; and (iv) the Inviter and Invitee agreeing to the license agreement for the Kracknow Application
                                and downloading and installing the Kracknow Application as available for the Inviter’s and Invitee’s

                                respective mobile devices. For the purposes of these Terms, an &#39;existing user of Kracknow&#39; shall mean a
                                user who presently operates an account with the Platform or operated an account with the Platform at any
                                point of time.
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>An Invitee who is an existing user of Kracknow is not permitted to register a new account with the
                                Platform for the purpose of availing of the Bonus Amount. Kracknow will determine in its sole discretion
                                whether an Invitee is an existing user of Kracknow or not and take appropriate action.
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>In the event that the Invitee opts to register for a Kracknow account through the Kracknow Application,
                                the Invitee can verify his/her contact information at the time of registration.
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>The verification process may require an Inviter/Invitee to submit personal information about the user
                                (Inviter/Invitee) and documents identifying the Inviter/Invitee. The Inviter agrees to receive communication
                                from Kracknow and to allow Kracknow to communicate with Invitees referred by you about the Inviter&#39;s
                                participation in the Program. Any information collected in respect of the Inviter/Invitee as part of the
                                Program or otherwise in the course of such person&#39;s use of the Website shall be subject to Kracknow&#39;s
                                Privacy Policy (available here: https://fantasycricket.Kracknow.com/in/privacypolicy for Indian users)
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>The verification of an Inviter/Invitee shall be completed at the time of first withdrawal by the Inviter/Invitee
                                from the Inviter’s/Invitee&#39;s &#39;Winnings&#39; Account with the Platform. An Inviter/Invitee may voluntarily seek
                                verification of the Inviter/Invitee by clicking on the &#39;Verify Now&#39; tab on the Winnings tab on the My Balance
                                Page of the Inviter/Invitee&#39;s account with the Platform.
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>The Invitee will be eligible to receive a maximum discount of Rs.200 (“Invitee Discount”).This Invitee
                                Discount shall be available for utilisation as per the table below . Please note the promotions mentioned
                                below are non-shareable and can be used only the user who receive the specific communication from the
                                Platform. The Promotions are available to use within seven (7) days of registration on the platform.
                            </Text>
                        </View>

                        <View style={{flexDirection:'row'}}>
                            <View>
                                <Text style={styles.heading}>Promotion</Text>

                                <Text style={styles.content}>Promotion No.1
                                </Text>

                                <Text style={styles.content}>Promotion No.2
                                </Text>

                                <Text style={styles.content}>Promotion No.3
                                </Text>

                                <Text style={styles.content}>Promotion No.4
                                </Text>
                            </View>

                            <View>
                                <Text style={styles.heading}>When</Text>

                                <Text style={styles.content}>Right after registration
                                </Text>

                                <Text style={styles.content}>Upon successful utilisation of Promotion No.1
                                </Text>

                                <Text style={styles.content}>Upon successful utilisation of Promotion No.2
                                </Text>

                                <Text style={styles.content}>Upon successful utilisation of Promotion No.3
                                </Text>
                            </View>

                            <View>
                                <Text style={styles.heading}>What</Text>

                                <Text style={styles.content}>75% off on contests above 1000 member
                                </Text>

                                <Text style={styles.content}>50% off on contests above 1000 member
                                </Text>

                                <Text style={styles.content}>25% off on contests above 1000 member
                                </Text>

                                <Text style={styles.content}>10% off on all contests 
                                </Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>Inviter Bonus a) In order for an Inviter to be eligible to earn the Bonus Amount due to him/her (&quot;Inviter
                                Bonus&quot;), the Inviter must also download and install the Kracknow Application on his/her mobile device. b)
                                The credit of the Inviter Bonus is contingent on the Invitee&#39;s deposit of any Amount in its Unutilised
                                Account and using such amounts to participate in cash contests on the Platform. The Inviter shall be
                                eligible to receive 10% of deposit amount used by the Invitee to join any cash contests on the Platform.
                                subject to a maximum of Rs. 500. As an example, in the event that the invitee uses Rs. 100 from his
                                Unutilized Account to join a cash contest on the Platform, the Inviter shall be eligible to receive Rs. 10 as
                                Inviter Bonus upon the successful completion of such contest. c) Subject to the provisions of a) and b)
                                above, the applicable Inviter Bonus earned by the Inviter shall be credited to the Inviter&#39;s Cash Bonus
                                Account within fifteen (15) days of the completion of the cash contest . d) It is clarified that the Inviter will
                                be eligible to receive the Inviter Bonus with respect to any contests only in the event the winners are
                                declared for such contests. In the event that the contest entry amount paid by the Invitee is refunded to
                                the Invitee with respect to any cash contest, for any reason, the Inviter shall not be eligible to receive any
                                Inviter Bonus for such contest or contest.
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>The Bonus Amounts credited to the Inviter can be used by the Inviter/ to join cash contests and contests
                                offered by Kracknow through the Platform. No part of the Bonus Amount may be used to join private
                                contests or be withdrawn or transferred to any other cash balance account held by the Inviter/Invitee with
                                Kracknow or to any third party account or to any bank/payment instrument account. THE BONUS
                                AMOUNT SHALL EXPIRE AND BE WITHOUT EFFECT AT THE END OF FOURTEEN DAYS FROM
                                THE DATE OF CREDIT OF THE BONUS AMOUNT.
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>The deposit of the Bonus Amount shall be at the sole discretion of Kracknow and shall be subject to the
                                Inviter’s/Invitee’s compliance with these Terms. Kracknow may substitute or change the Bonus Amount
                                offered under the Program at any time without notice. An Inviter may not substitute the amount of Bonus
                                Amount or substitute offering for other items or exchange for cash.
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>Kracknow reserves the right to:
                            </Text>
                        </View>

                        <Text style={styles.content}>a. withhold the deposit of the Bonus Amount; and/or
                        </Text>

                        <Text style={styles.content}>b. forfeit any deposited Bonus Amount to an Inviter/Invitee or any prizes/winnings earned by the participant
                            by using such Bonus Amount; and/or
                        </Text>

                        <Text style={styles.content}>c. deactivate the accounts of the Inviter/Invitee, in the event that it determines or reasonably believes that
                            such Inviter/Invitee has violated these Terms or the terms and conditions of the Kracknow fantasy games.
                        </Text>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>Mere participation in the Program does not entitle the Inviter to receive any Bonus Amount.
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>Kracknow may, at its sole and absolute discretion, disqualify any Inviter/Invitee if such Inviter/Invitee
                                engages in or it is found that such Inviter/Invitee has engaged in any illegal, unlawful or improper conduct
                                (with regard to the Program or otherwise).
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>The decision of Kracknow will be final and binding with regard to the Program, and the deposit of the
                                Bonus Amount and the Invitee Discount and no correspondence, objection, complaints, etc. will be
                                entertained in this regard.
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>This Program cannot be clubbed with any other contests/promotions/programs that are running
                                simultaneously and organised or conducted by Kracknow.
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>Kracknow reserves the right to change/modify/or withdraw the Program and/or change these terms and
                                conditions without any prior notice of the same at its sole discretion.
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>The Terms and Conditions, as applicable to the Kracknow&#39;s fantasy games and services, will apply to and
                                govern the Program.
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>Kracknow does not make any commitment, express or implied, to respond to any feedback, suggestion
                                and, or, queries of the participants (Inviter/Invitee) of the Program.
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.content}> {'\u2B24'} </Text>
                            <Text style={styles.content}>Notwithstanding anything contained herein, the aggregate liability of Kracknow to a participating
                                Inviter/Invitee in relation to the Program for any reason whatsoever shall not exceed Rs.200.
                            </Text>
                        </View>























                    </View> */}

                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.white
    },
    root: {
        flex:1
        // alignItems: 'center',
        // padding: 10,
    },
    loginBtn: {
        width: "100%",
        borderRadius: 10,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 90,
        backgroundColor: "#1E276F",
    },
    heading: {
        fontWeight: '700',
        color: 'black',
        paddingBottom: 10
    },
    content: {
        color: 'black',
        paddingBottom: 10,
        // paddingRight:10


    },
    hyperlinkStyle: {
        color: 'blue',
    },

});
