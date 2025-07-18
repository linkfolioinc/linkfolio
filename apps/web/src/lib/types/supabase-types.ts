export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

// Profile Skill
export type Skill = {
  label: string;
  value: string;
  logo: string;
  category: string;
};

// Social Link
export type Social = {
  url: string;
};

// Theme
export type Theme = {
  id: number;
  theme_data: {
    foreground: string;
    background: string;
    primary: string;
    card: string;
    border: string;
    secondary: string;
  };
  theme_type: 'light' | 'dark' | 'default';
};

export type Role = {
  headline: string;
  location: string;
  location_type: 'On-site' | 'Hybrid' | 'Remote';
  employment_type:
    | 'Full-time'
    | 'Part-time'
    | 'Self-employed'
    | 'Freelance'
    | 'Internship'
    | 'Trainee';
  currently_working: boolean;
  start_date: string;
  end_date?: string;
};

export type Experience = {
  a: number;
  roles: Role[];
  company: string;
  skills_used: Skill[];
  company_link: string;
  contribution: string;
};

//profile certification
export type Certification = {
  name: string;
  url: string;
  description: string;
};

export type NatureType =
  | 'Active'
  | 'Passive'
  | 'Builder'
  | 'Thinker'
  | 'Hacker'
  | 'Designer'
  | 'Leader'
  | 'Supporter'
  | 'Learner'
  | 'Explorer'
  | 'Visionary'
  | 'Community';

export type NatureIconMap = {
  Active: '⚡️';
  Passive: '🌙';
  Builder: '🏗️';
  Thinker: '🧠';
  Hacker: '💻';
  Designer: '🎨';
  Leader: '👑';
  Supporter: '🤝';
  Learner: '📚';
  Explorer: '🧭';
  Visionary: '🔭';
  Community: '🏘️';
};

export type Nature = {
  [K in keyof NatureIconMap]: {
    type: K;
    icon: NatureIconMap[K];
  };
}[NatureType];

export type GridSingleInfo = {
  techstack: Skill[];
  timezone: string;
  nature: Nature;
  educationInShort: string;
  universityInShort: string;
  healineInShort: string;
  flipwords: string[];
  languages: string[];
  meetingScheduleLink: string;
  quote: string;
};

export type MagazineInfo = {
  themeColor: string;
  coverPhoto: string;
  summaryBlurb: string;
};

export type TemplateInfo = {
  activeTemplate: 'default' | 'grid-single' | 'scifi';
  templates: {
    default?: Record<string, never>;
    'grid-single'?: GridSingleInfo;
    scifi?: Record<string, never>;
  };
};

export type Profile = Database['public']['Tables']['profiles']['Row'];
export type Project = Database['public']['Tables']['projects']['Row'];
export type Startup = Database['public']['Tables']['startups']['Row'];

//Final Profile
export type CompleteProfile = Profile & {
  startups?: Startup[];
  projects?: Project[];
};

export type PartialUpdate = Partial<Database['public']['Tables']['profiles']['Update']>

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          avatar_url: string;
          company: string;
          country: string;
          education: {
            branch: string;
            end_date: string;
            start_date: string;
            university: string;
            grade: string;
          };
          email: string;
          experience: Experience[];
          favicon_url: string;
          full_name: string;
          geo_info: {
            city: string;
            state: string;
          };
          headline: string;
          id: string;
          onboarding: string;
          profile_link: {
            url: string;
            text: string;
          };
          shortbio: string;
          skills: Skill[];
          certifications: Certification[];
          socials: Social[];
          theme: Theme;
          username: string;
          template_info: TemplateInfo;
        };
        Insert: {
          avatar_url: string;
          company: string;
          country: string;
          education: {
            branch: string;
            end_date: string;
            start_date: string;
            university: string;
            grade: string;
          };
          email: string;
          experience: Experience[];
          favicon_url: string;
          full_name: string;
          geo_info: {
            city: string;
            state: string;
          };
          headline: string;
          id: string;
          onboarding: string;
          profile_link: {
            url: string;
            text: string;
          };
          shortbio: string;
          skills: Skill[];
          certifications: Certification[];
          socials: Social[];
          theme: Theme;
          username: string;
          template_info: TemplateInfo;
        };
        Update: {
          avatar_url?: string;
          company?: string;
          country?: string;
          education?: {
            branch?: string;
            end_date?: string;
            start_date?: string;
            university?: string;
            grade?: string;
          };
          email?: string;
          experience?: Experience[];
          favicon_url?: string;
          full_name?: string;
          geo_info?: {
            city?: string;
            state?: string;
          };
          headline?: string;
          id?: string;
          onboarding?: string;
          profile_link?: {
            url?: string;
            text?: string;
          };
          shortbio?: string;
          skills?: Skill[];
          certifications?: Certification[];
          socials?: Social[];
          theme?: Theme;
          username?: string;
          template_info?: TemplateInfo;
        };
        Relationships: [];
      };
      projects: {
        Row: {
          category: string;
          created_at: string | null;
          description: string;
          id: string;
          index: number;
          name: string;
          show_on_profile: boolean;
          url: string;
          user_id: string | null;
        };
        Insert: {
          category: string;
          created_at?: string | null;
          description: string;
          id?: string;
          index: number;
          name: string;
          show_on_profile: boolean;
          url: string;
          user_id?: string | null;
        };
        Update: {
          category?: string;
          created_at?: string | null;
          description?: string;
          id?: string;
          index?: number;
          name?: string;
          show_on_profile?: boolean;
          url?: string;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'projects_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
      startups: {
        Row: {
          api_info: Json | null;
          category: string;
          created_at: string;
          description: string;
          id: string;
          index: number;
          name: string;
          revenue: number;
          show_on_profile: boolean;
          show_revenue: boolean;
          show_status: boolean;
          status: string;
          url: string;
          user_id: string;
          verified: boolean;
        };
        Insert: {
          api_info?: Json | null;
          category?: string | null;
          created_at?: string | null;
          description?: string | null;
          id?: string;
          index: number;
          name: string;
          revenue?: number | null;
          show_on_profile?: boolean | null;
          show_status?: boolean | null;
          status?: string | null;
          url: string;
          user_id?: string | null;
          verified?: boolean | null;
        };
        Update: {
          api_info?: Json | null;
          category?: string | null;
          created_at?: string | null;
          description?: string | null;
          id?: string;
          index?: number;
          name?: string;
          revenue?: number | null;
          show_on_profile?: boolean | null;
          show_status?: boolean | null;
          status?: string | null;
          url?: string;
          user_id?: string | null;
          verified?: boolean | null;
        };
        Relationships: [
          {
            foreignKeyName: 'startups_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      delete_and_reindex: {
        Args: { startup_id: string; input_user_id: string; deleted_index: number };
        Returns: undefined;
      };
      delete_and_reindex_p: {
        Args: { project_id: string; input_user_id: string; deleted_index: number };
        Returns: undefined;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DefaultSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        Database[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      Database[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] & DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums'] | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {},
  },
} as const;
