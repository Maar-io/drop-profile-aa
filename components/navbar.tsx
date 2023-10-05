import { ConnectWallet } from '@thirdweb-dev/react'
import { ThirdwebNftMedia, Web3Button, useAddress, useContract, useNFTs, useOwnedNFTs, useTokenBalance, useBalance } from "@thirdweb-dev/react";
import { MONSTER_CONTRACT_ADDRESS, TOKEN_CONTRACT_ADDRESS } from "../const/addresses";
import { NATIVE_TOKEN_ADDRESS } from "@thirdweb-dev/sdk";

import styles from "../styles/Home.module.css";
import Link from 'next/link'

export default function Navbar() {
    const address = useAddress();
    const {
        contract: tokenContract
    } = useContract(TOKEN_CONTRACT_ADDRESS);
    const {
        data: tokenBalance,
        isLoading: isTokenBalanceLoading,
    } = useTokenBalance(tokenContract, address);
    const { data: nativeBalance, isLoading: isNativeBalanceLoading} = useBalance(NATIVE_TOKEN_ADDRESS);

    const tokenMintlUrl = 'https://embed.ipfscdn.io/ipfs/bafybeigtqeyfmqkfbdu7ubjlwhtqkdqckvee7waks4uwhmzdfvpfaqzdwm/erc20.html?contract=0x43C61EC1D7408Fcd05aF9Ab51E637a376E16B63C&chain=%7B%22name%22%3A%22Mumbai%22%2C%22chain%22%3A%22Polygon%22%2C%22rpc%22%3A%5B%22https%3A%2F%2Fmumbai.rpc.thirdweb.com%2F%24%7BTHIRDWEB_API_KEY%7D%22%5D%2C%22nativeCurrency%22%3A%7B%22name%22%3A%22MATIC%22%2C%22symbol%22%3A%22MATIC%22%2C%22decimals%22%3A18%7D%2C%22shortName%22%3A%22maticmum%22%2C%22chainId%22%3A80001%2C%22testnet%22%3Atrue%2C%22slug%22%3A%22mumbai%22%2C%22icon%22%3A%7B%22url%22%3A%22ipfs%3A%2F%2FQmcxZHpyJa8T4i63xqjPYrZ6tKrt55tZJpbXcjSDKuKaf9%2Fpolygon%2F512.png%22%2C%22width%22%3A512%2C%22height%22%3A512%2C%22format%22%3A%22png%22%7D%7D&clientId=a6dc07617ae19a2f68843650f2dd14f3&theme=light&primaryColor=purple';

    function truncateAddress(address: string) {
        if (address){
            console.log(address);
            return `${address?.slice(0, 6)}...${address.slice(-4)}`;
        }
        return "..."
    }

    return (
        <div className={styles.navbar}>
            <h3>GachaDrom</h3>
            <div className={styles.tokenBalance}>
                {!isTokenBalanceLoading && (
                    <p >
                        Tokens{" "}
                        <a href={tokenMintlUrl}>{tokenBalance?.displayValue}</a>
                    </p>
                )}
            </div>
            <div className={styles.tokenBalance}>
                {!isNativeBalanceLoading && (
                    <p >
                        Gas{" "}
                        {nativeBalance?.displayValue}
                    </p>
                )}
            </div>
            <div className={styles.navLinks}>
                {address && (
                    <Link href={`profile/${address}`}>
                        <p>Profile</p>
                    </Link>
                )}
            </div>
            <div >
                <h3>{truncateAddress(address!)}</h3>
            </div>

        </div>

    )
};