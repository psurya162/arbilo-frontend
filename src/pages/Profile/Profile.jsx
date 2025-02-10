import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileForm from './ProfileForm';
import PasswordForm from './PasswordForm';
import { IoMdPerson, IoMdLock, IoMdCard } from 'react-icons/io';
import SubscriptionPage from './SubscriptionPage';

const Profile = () => {
  const [activeTab, setActiveTab] = useState("manageProfile");

  return (
    <div className="p-4 md:p-8">
      {/* Heading */}
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 text-center uppercase">
        Profile & Subscriptions
      </h1>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        {/* Tabs List */}
        <TabsList className="flex  md:flex-row justify-around mb-4 p-2 md:p-6 gap-2 ">
          <TabsTrigger
            value="manageProfile"
            className="flex items-center gap-2 px-4 py-2 text-sm md:text-lg w-full md:w-auto justify-center md:justify-start"
          >
            <IoMdPerson size={20} />
            <span>Manage Profile</span>
          </TabsTrigger>
          <TabsTrigger
            value="changePassword"
            className="flex items-center gap-2 px-4 py-2 text-sm md:text-lg w-full md:w-auto justify-center md:justify-start"
          >
            <IoMdLock size={20} />
            <span>Change Password</span>
          </TabsTrigger>
          <TabsTrigger
            value="subscription"
            className="flex items-center gap-2 px-4 py-2 text-sm md:text-lg w-full md:w-auto justify-center md:justify-start"
          >
            <IoMdCard size={20} />
            <span>Subscription</span>
          </TabsTrigger>
        </TabsList>

        {/* Tabs Content */}
        <TabsContent value="manageProfile">
          <ProfileForm />
        </TabsContent>

        <TabsContent value="changePassword">
          <PasswordForm />
        </TabsContent>

        <TabsContent value="subscription">
          
          <SubscriptionPage/>
          {/* Add your subscription content here */}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;