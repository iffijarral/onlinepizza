import { Container, List, ListItem, ListItemText, Typography } from "@mui/material";
import React from "react";

export const Terms = () => {
    return (
        <React.Fragment>
            <Container maxWidth='lg' style={{ padding: '1em', marginTop: '2em', border: '.5px solid #eee', borderRadius: 8, backgroundColor: 'beige' }}>
                <Typography variant="h5"> TERMS OF PURCHASE </Typography>
                <List>
                    <ListItem>
                        <ListItemText>
                           <Typography variant="body1"> To use the vitaliapizza.dk, You must ensure that You: (i) have a functioning Device (as defined below); (ii) have an internet connection. </Typography>
                        </ListItemText>
                    </ListItem>

                    <ListItem>
                        <ListItemText>
                            Subject to You complying with Section 1a., the Service shall ensure that You can: (i) view Items for sale; (ii) purchase Items using the Service; (iii) track the order of Items;
                        </ListItemText>
                    </ListItem>

                    <ListItem>
                        <ListItemText>
                            When You purchase an Item on the Service using the vitaliapizza.dk, You shall pay for such Item by either using a credit or debit card.
                        </ListItemText>
                    </ListItem>

                    <ListItem>
                        <ListItemText>
                            You shall pay all VAT and other taxes (“Taxes”) associated with Your purchase of Items on the Service. The Service shall ensure that the price stated for any Items includes all such Taxes.
                        </ListItemText>
                    </ListItem>

                    <ListItem>
                        <ListItemText>
                            You shall not: (i) manipulate transactions in any way which is unfair to other users of the Service; or (ii) use the Service in contravention of applicable laws nor permit or assist others to do so.
                        </ListItemText>
                    </ListItem>
                </List>

                <Typography variant="h5"> PAYMENT AND DELIVERY PROCESS </Typography>
                <List>
                    <ListItem>
                        <ListItemText>
                            You need to register to access the Service and You will be required to enter Your payment details to pay for Items using Your credit or debit card. On collecting or the delivery of Items, You may be required to show Your phone displaying your transactionID to the Restaurant staff at the time of collection or delivery of Items as proof of identification. You are responsible for the safekeeping of Your transactionID.
                        </ListItemText>
                    </ListItem>

                    <ListItem>
                        <ListItemText>
                            Payment process is performed via Yourpay. However, You acknowledge that the transmission of information via the internet is not completely secure and vitaliapizza cannot guarantee the security of Your data transmitted through the vitaliapizza.dk, which is transmitted at Your risk. vitaliapizza shall not be liable for any claims arising from misuse of Your credit or debit card where such misuse is a result of Your failure to keep Your credit or debit card secure.
                        </ListItemText>
                    </ListItem>

                    <ListItem>
                        <ListItemText>
                            The Service shall comply with all applicable laws and regulations related to Your use of the Service, including but not limited to laws and regulations concerning distance selling, refunds and returns, data protection and food safety.
                        </ListItemText>
                    </ListItem>

                    <ListItem>
                        <ListItemText>
                            You shall pay all VAT and other taxes (“Taxes”) associated with Your purchase of Items on the Service. The Service shall ensure that the price stated for any Items includes all such Taxes.
                        </ListItemText>
                    </ListItem>

                </List>

                <Typography variant="h5"> CANCELLATIONS, DISPUTES AND REFUNDS </Typography>

                <List>
                    <ListItem>
                        <ListItemText>
                            The term of this Agreement shall commence upon You commencing use of the Service and shall terminate upon You ceasing use of the Service.
                        </ListItemText>
                    </ListItem>
                </List>

                <Typography variant="h5"> TERMS OF PURCHASE </Typography>

                <List>
                    <ListItem>
                        <ListItemText>
                            Once You have submitted and paid for Your order for Tangible Items, You will be entitled to amend or cancel Your order on the vitaliapizza App until the Service has accepted it. The Service has discretion to reject Your order, for example if the Restaurant has no longer got Items in stock or if the Restaurant is too busy to be able to fulfil Your order. When You submit and pay for an order, Your bank or card issuer will ring-fence the payment amount. If You cancel an order or the Service rejects it, Your bank or card issuer will release the payment amount back to Your account (without transferring the amount to vitaliapizza), although You accept this may take up to [7] days.
                        </ListItemText>
                    </ListItem>

                    <ListItem>
                        <ListItemText>
                            If You have any dispute with the Service or You think You are entitled to a refund, You should contact the Restaurant staff as this in most cases will result in instantly resolution of the dispute.
                        </ListItemText>
                    </ListItem>
                </List>

                <Typography variant="h5"> LIABILITY </Typography>

                <List>
                    <ListItem>
                        <ListItemText>
                            The parties’ liability to each other for death, personal injury, fraudulent misrepresentation or any other liability that cannot be excluded by law shall not be limited.
                        </ListItemText>
                    </ListItem>

                    <ListItem>
                        <ListItemText>
                            Subject to Section 7a. vitaliapizza shall not be liable to You whether in contract, tort, breach of statutory duty, or otherwise, even if foreseeably, arising under or in connection with the Service, the Website for: loss of profits, sales, business or revenue; loss of goodwill; indirect or inconsequential loss or loss or corruption of data.
                        </ListItemText>
                    </ListItem>

                    <ListItem>
                        <ListItemText>
                            Subject to Sections 7a. and b. above, vitaliapizza's total liability to You shall not exceed 100% of the price of Your order.
                        </ListItemText>
                    </ListItem>
                </List>

                <Typography variant="h5"> DATA PROTECTION </Typography>
                <List>
                    <ListItem>
                        <ListItemText>
                            vitaliapizza is committed to protecting Your privacy and security. Any personal data that we collect from You will be minimal and will be processed in accordance with our Privacy Policy.
                        </ListItemText>
                    </ListItem>

                </List>
            </Container>
        </React.Fragment>
    );
}