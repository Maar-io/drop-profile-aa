import styles from "../../styles/Home.module.css";
import {
    ConnectWallet,
    metamaskWallet,
    coinbaseWallet,
    walletConnect,
    embeddedWallet,
} from "@thirdweb-dev/react";


export default function Wallet() {

    return (
        <div className={styles.connect}>
            {/* <ConnectWallet
                dropdownPosition={{
                    side: "bottom",
                    align: "center",
                }}

            /> */}
            <ConnectWallet
                theme={"light"}
                btnTitle={"Connect"}
                switchToActiveChain={true}
                modalSize={"wide"}
                welcomeScreen={{
                    img: {
                        src: "https://github.com/AstarNetwork/brand-assets/blob/main/Astar%20Identity/logo/symbol/Astar_ring.png",
                        width: 150,
                        height: 150,
                    },
                }}
            />
        </div>
    )
}