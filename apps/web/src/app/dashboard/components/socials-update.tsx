'use client';
import { Button } from '@dr/ui/components/base/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@dr/ui/components/base/dialog';
import { Globe, Link2, Pencil, Plus } from 'lucide-react';
import React, { useState } from 'react';
import SocialsForm from '../forms/socials-form';


import type { Profile, Social } from '@/lib/types/supabase-types';
import { PlatformIcon } from '@/components/general/get-platform-icon';

const SocialsUpdate = ({ profile }: { profile: Profile }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      {profile.socials.length > 0 ? (
        <div className="flex flex-col gap-2 px-4">
          {profile.socials.map((social: Social, index: number) => {
            return (
              <div
                className="flex items-center justify-between gap-4 bg-muted py-2 px-3 lg:px-4 rounded-md"
                key={index}
              >
                {/* Left side: Icon + URL */}
                <div className="flex justify-center items-center gap-1.5 lg:gap-2">
                  <PlatformIcon url={social.url} className='text-foreground/60' />
                  <p className="text-xs lg:text-sm font-medium max-w-36 md:max-w-fit truncate">{social.url}</p>
                </div>

                <Button variant="outline" size="icon" onClick={() => setOpen(true)}>
                  <Pencil size={16} />
                </Button>
              </div>
            );
          })}
          <Button onClick={() => setOpen(true)} variant={'outline'} className="w-full mt-2">
            Add Social <Plus />
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center bg-muted/40 rounded-2xl p-6 shadow-sm h-[300px] border-2 border-dashed border-foreground/10 transition-colors">
          <Globe size={64} className="text-muted-foreground mb-4 opacity-60 " />
          <h1 className="text-lg font-semibold text-muted-foreground mb-2 opacity-60 ">
            No socials added yet
          </h1>
          <p className="text-sm text-muted-foreground mb-4 max-w-xs opacity-60 ">
            You haven't added any social links to your profile yet.
          </p>
          <Button
            onClick={() => setOpen(true)}
            variant="outline"
            className="flex items-center gap-2 opacity-100"
          >
            <Plus className="w-4 h-4" />
            Add Socials
          </Button>
        </div>
      )}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent onOpenAutoFocus={(e) => e.preventDefault()} className="sm:max-w-[600px] max-h-[70vh] overflow-y-auto scrollbar-hidden no_scrollbar">
          <DialogHeader className="mb-4">
            <DialogTitle className='text-base lg:text-lg'>Add/Edit Socials</DialogTitle>
          </DialogHeader>
          <SocialsForm profile={profile} setOpen={setOpen} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SocialsUpdate;
