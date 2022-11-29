import { Flex, Image, Link, Spacer } from "@chakra-ui/react";
import NextLink from "next/link";

const logoSrc =
  "http://lkh.669.myftpupload.com/wp-content/uploads/2022/07/ATLBrew-Logo500x500-trimmed.png";

export const Topbar = ({ ...rest }) => (
  <Flex
    as="header"
    backgroundColor="white"
    height="84px"
    paddingLeft={["4", "6"]}
    paddingRight={["4", "6"]}
    paddingTop="0"
    paddingBottom="0"
    flexDirection={["column", "row"]}
    justifyContent={["center", "flex-start"]}
    alignItems={["center", "center"]}
    {...rest}
  >
    <Image
      objectFit="contain"
      src={logoSrc}
      alt="Atlanta Brewery Tours Logo"
      marginLeft={["auto", 0]}
      marginRight={["auto", 0]}
      width={["120px", "150px"]}
    />
    <Spacer display={["block", "none"]} height="2" flex="0 0 auto" />
    <Flex alignItems="center" marginLeft={[0, "auto"]} as="nav">
      <Link as={NextLink} href="/" fontWeight="bold">
        Home
      </Link>
      <Spacer width="32px" />
      <Link as={NextLink} href="/about" fontWeight="bold">
        About
      </Link>
      <Spacer width="32px" />
      <Link as={NextLink} href="/donate" fontWeight="bold">
        Donate
      </Link>
    </Flex>
  </Flex>
);
