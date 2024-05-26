import React, { useEffect, useState } from "react";
import { View, Flex, useTheme, Loader } from "@aws-amplify/ui-react";
import ProfileHeader from "./ProfileHeader";
import ProfileInformation from "./ProfileInformation";
import ProfileSettings from "./ProfileSettings";
import "./Profile.css";
import { fetchUserAttributes } from "aws-amplify/auth";

interface ProfileAttributes {
  name?: string;
  email?: string;
}

const Profile = () => {
  const { tokens } = useTheme();
  const defaultAttributes: ProfileAttributes = {name: "", email: ""};
  const [data, setData] = useState(defaultAttributes);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const getUserInfo = async () => {
      const attributes = await fetchUserAttributes();
      setData(attributes);
      setLoading(false);
    };

    getUserInfo();

  }, []);

  return (
    <>
      <div>
        <h2>Profilo</h2>
      </div>
      <View maxWidth="100%" padding="0rem" minHeight="100vh">
        <Flex
          direction={{ base: "column", large: "row" }}
          alignItems="flex-start"
          gap={tokens.space.xl}
          marginBottom="30px"
        >
          <View
            backgroundColor="var(--amplify-colors-white)"
            borderRadius="6px"
            width={{ base: "100%", large: "100%" }}
            padding="1rem"
          >
            {loading ? <Loader/> : <ProfileHeader name={data.name} email={data.email}/>}
          </View>
        </Flex>

        <Flex
          direction={{ base: "column", large: "row" }}
          gap={tokens.space.xl}
          alignItems="flex-start"
        >
          <View
            backgroundColor="var(--amplify-colors-white)"
            borderRadius="6px"
            width={{ base: "100%", large: "40%" }}
            padding={{ base: "1em", large: "1.5rem" }}
          >
            <ProfileInformation />
          </View>
          <View
            backgroundColor="var(--amplify-colors-white)"
            borderRadius="6px"
            width={{ base: "100%", large: "40%" }}
            padding={{ base: "1em", large: "1.5rem" }}
          >
            <ProfileSettings />
          </View>
        </Flex>
      </View>
    </>
  );
};

export default Profile;