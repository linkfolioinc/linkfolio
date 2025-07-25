'use client';
import React, { useState } from 'react';
import AvatarComponent from './components/avatar-update';
import FaviconComponent from './components/favicon-update';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@dr/ui/components/base/tabs';
import TemplateSelect from './components/template-select';
import ExperienceUpdate from './components/experience-update';
import SocialsUpdate from './components/socials-update';
import MobilePreview from './components/mobile-preview';
import ProfileUpdate from './components/profile-update';
import PreviewButton from './components/preview-button';
import AnalyticsCard from './components/analytics-card';
import { ExternalLink, FolderKanban } from 'lucide-react';
import LogoutConfirmation from '@/modals/logout-confirmation';
import Link from 'next/link';
import Navbar from './components/navbar';

import type { Theme, Profile, Startup, Project } from '@/lib/types/supabase-types';
import type { User } from '@supabase/supabase-js';
import { useIsMobile } from '@dr/ui/hooks/use-mobile';


const Dashboard = ({
  user,
  profile,
  startups,
  projects,
  tab
}: {
  user: User;
  profile: Profile;
  startups: Startup[];
  projects: Project[];
  tab: string;
}) => {
  const [preview, setPreview] = useState(false);
  const [localTheme, setLocalTheme] = useState<Theme>(profile.theme);
  const [logoutModal, setLogoutModal] = useState(false);
  const isMobile = useIsMobile();

  return (
    <>
      <LogoutConfirmation modal={logoutModal} setModal={setLogoutModal} />
      <div className="relative flex flex-col lg:flex-row h-screen w-full max-w-7xl mx-auto gap-4">
        <div className="lg:w-[60%] w-full h-screen overflow-y-auto px-4 py-6 no_scrollbar scrollbar-hidden relative">
          <Navbar user={user} setLogoutModel={setLogoutModal} />
          {isMobile && <PreviewButton setPreview={setPreview} />}
          <div className="w-full grid grid-cols-4 md:grid-cols-3 items-center justify-center gap-4 mt-4 px-4">
            <AvatarComponent avatar_url={profile.avatar_url} />
            <FaviconComponent favicon_url={profile.favicon_url} />
            <AnalyticsCard />
          </div>
          <Tabs defaultValue={tab} className="w-full mt-8 mb-12 lg:mt-12">
            <div className="overflow-x-auto overflow-y-hidden">
              <TabsList className="flex w-fit gap-3 lg:gap-6 px-2 lg:px-3 bg-background rounded-none">
                <TabsTrigger
                  className="border-t-0 cursor-pointer border-r-0 border-l-0 border-b-[3px] border-transparent data-[state=active]:border-primary text-muted-foreground data-[state=active]:text-foreground pb-[18px] pt-4 text-xs lg:text-sm font-bold tracking-[0.015em] bg-transparent rounded-none focus-visible:ring-0 focus-visible:outline-none"
                  value="profile"
                >
                  Profile
                </TabsTrigger>
                <TabsTrigger
                  className="border-t-0 cursor-pointer border-r-0 border-l-0 border-b-[3px] border-transparent data-[state=active]:border-primary text-muted-foreground data-[state=active]:text-foreground pb-[18px] pt-4 text-xs lg:text-sm font-bold tracking-[0.015em] bg-transparent rounded-none focus-visible:ring-0 focus-visible:outline-none"
                  value="experience"
                >
                  Experience
                </TabsTrigger>
                <TabsTrigger
                  className="border-t-0 cursor-pointer border-r-0 border-l-0 border-b-[3px] border-transparent data-[state=active]:border-primary text-muted-foreground data-[state=active]:text-foreground pb-[18px] pt-4 text-xs lg:text-sm font-bold tracking-[0.015em] bg-transparent rounded-none focus-visible:ring-0 focus-visible:outline-none"
                  value="projects_startups"
                >
                  Work Showcase
                </TabsTrigger>
                <TabsTrigger
                  className="border-t-0 cursor-pointer border-r-0 border-l-0 border-b-[3px] border-transparent data-[state=active]:border-primary text-muted-foreground data-[state=active]:text-foreground pb-[18px] pt-4 text-xs lg:text-sm font-bold tracking-[0.015em] bg-transparent rounded-none focus-visible:ring-0 focus-visible:outline-none"
                  value="socials"
                >
                  Socials
                </TabsTrigger>
                <TabsTrigger
                  className="border-t-0 cursor-pointer border-r-0 border-l-0 border-b-[3px] border-transparent data-[state=active]:border-primary text-muted-foreground data-[state=active]:text-foreground pb-[18px] pt-4 text-xs lg:text-sm font-bold tracking-[0.015em] bg-transparent rounded-none focus-visible:ring-0 focus-visible:outline-none"
                  value="templates"
                >
                  Templates
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="profile">
              <ProfileUpdate profile={profile} />
            </TabsContent>
            <TabsContent value="experience" className="mt-4">
              <ExperienceUpdate profile={profile} />
            </TabsContent>
            <TabsContent value="projects_startups" className="mt-4">
              <div className="w-full mt-1 lg:px-8 py-4">
                <div className="text-sm lg:text-base flex flex-col items-center justify-start gap-2">
                  <Link href={'/dashboard/projects'} className="cursor-pointer flex items-center justify-between w-full bg-muted rounded-md px-3 py-2 text-foreground/70 hover:text-foreground transition-colors duration-200">
                    <FolderKanban strokeWidth={1}/>
                    <p>Add or edit Projects here</p>
                    <ExternalLink strokeWidth={1}/>
                  </Link>
                  <Link href={'/dashboard/startups'} className="cursor-pointer flex items-center justify-between w-full bg-muted rounded-md px-3 py-2 text-foreground/70 hover:text-foreground transition-colors duration-200">
                    <FolderKanban strokeWidth={1}/>
                    <p>Add or edit Startups here</p>
                    <ExternalLink strokeWidth={1}/>
                  </Link>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="socials" className="mt-4">
              <SocialsUpdate profile={profile} />
            </TabsContent>
            <TabsContent value="templates" className="mt-4">
              <TemplateSelect localTheme={localTheme} setLocalTheme={setLocalTheme} templateInfo={profile.template_info} />
            </TabsContent>
          </Tabs>
        </div>
        <MobilePreview
          preview={preview}
          setPreview={setPreview}
          profile={profile}
          startups={startups}
          projects={projects}
          theme={localTheme}
        />
      </div>
    </>
  );
};

export default Dashboard;
