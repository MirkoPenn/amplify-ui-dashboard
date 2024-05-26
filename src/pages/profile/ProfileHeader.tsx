import React from "react";
import { Flex, Text } from "@aws-amplify/ui-react";

interface ProfileHeaderProps {
  name?: string;
  email?: string;
}

const ProfileHeader = (props: ProfileHeaderProps) => {
  return (
    <>
      <Flex
        direction={{ base: "column", large: "row" }}
        alignItems="flex-start"
      >
        <div className="profile-header-text">
          <Text variation="primary" fontWeight={600} fontSize="18px">
            {props.name ?? "-"}
          </Text>
          <Text variation="tertiary">
            {props.email ?? "-"}
          </Text>
        </div>
      </Flex>
    </>
  );
};

export default ProfileHeader;
