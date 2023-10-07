import { ThirdwebSDK, isContractDeployed } from "@thirdweb-dev/sdk";
import { SmartWallet, LocalWallet } from "@thirdweb-dev/wallets";
import { Mumbai } from "@thirdweb-dev/chains";
import { MONSTER_CONTRACT_ADDRESS, TOKEN_CONTRACT_ADDRESS, ACCOUNT_FACTORY_ADDRESS } from "../const/addresses";

const chain = Mumbai;

export function createSmartWallet(): SmartWallet {
    const smartWallet = new SmartWallet({
        chain: "mumbai",
        factoryAddress: ACCOUNT_FACTORY_ADDRESS || "",
        gasless: true,
        clientId: process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID,
    });
    return smartWallet;
};

export async function connectSmartWallet(
    password: string,
    statusCallback: (status: string) => void
): Promise<SmartWallet> {
    statusCallback("Searching for GachaStar account...");
    const smartWallet = createSmartWallet();
    const personalWallet = new LocalWallet();
    await personalWallet.loadOrCreate({
        strategy: "encryptedJson",
        password: password,
    });
    await smartWallet.connect({
        personalWallet
    });

    const sdk = await ThirdwebSDK.fromWallet(
        smartWallet,
        chain,
        {
            clientId: process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID,
        }
    );

    const address = await sdk.wallet.getAddress();
    const isDeployed = await isContractDeployed(
        address,
        sdk.getProvider(),
    );

    if (!isDeployed) {
        statusCallback("New account detected...");
        const monsterContract = await sdk.getContract(MONSTER_CONTRACT_ADDRESS);
        const tokenContract = await sdk.getContract(TOKEN_CONTRACT_ADDRESS);

        // statusCallback("Creating new account...");
        // const tx1 = await monsterContract.erc1155.claim.prepare(0, 1);
        // statusCallback("Sending profile NFT...");
        // // const tx1 = await monsterContract.erc721.claim.prepare(1);
        // // await tx1.execute();

        // const tx2 = await tokenContract.erc20.claim.prepare(10);
        // const transactions = [tx1, tx2];

        // statusCallback("Sending initial funds...");
        // const batchTx = await smartWallet.executeBatch(transactions);
        statusCallback("Creating new account...");
        const tx1 = await monsterContract.erc1155.claim.prepare(3, 1);
        const tx2 = await tokenContract.erc20.claim.prepare(10);
        const transactions = [tx1, tx2];

        statusCallback("Minting Profile NFT and initial funds...");
        const batchTx = await smartWallet.executeBatch(transactions);
    } else {
        statusCallback("GachaStar account found! Loading gallery...");
    }
    return smartWallet;
};