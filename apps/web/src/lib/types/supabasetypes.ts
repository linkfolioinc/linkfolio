export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]


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
            grade : string;
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
          socials: Social[];
          theme: Theme;
          username: string;
        };
        Insert: {
          avatar_url?: string | null
          company?: string | null
          country?: string | null
          education?: Json | null
          email?: string | null
          experience?: Json | null
          favicon_url?: string | null
          full_name?: string | null
          geo_info?: Json | null
          headline?: string | null
          id: string
          onboarding?: string | null
          profile_link?: Json | null
          shortbio?: string | null
          skills?: Json | null
          socials?: Json | null
          theme?: Json | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          company?: string | null
          country?: string | null
          education?: Json | null
          email?: string | null
          experience?: Json | null
          favicon_url?: string | null
          full_name?: string | null
          geo_info?: Json | null
          headline?: string | null
          id?: string
          onboarding?: string | null
          profile_link?: Json | null
          shortbio?: string | null
          skills?: Json | null
          socials?: Json | null
          theme?: Json | null
          username?: string | null
        }
        Relationships: []
      }
      projects: {
        Row: {
          category: string
          created_at: string | null
          description: string
          id: string
          index: number
          name: string
          show_on_profile: boolean
          url: string
          user_id: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          description: string
          id?: string
          index: number
          name: string
          show_on_profile: boolean
          url: string
          user_id?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string
          id?: string
          index?: number
          name?: string
          show_on_profile?: boolean
          url?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "projects_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      startups: {
        Row: {
          api_info: Json | null
          category: string | null
          created_at: string | null
          description: string | null
          id: string
          index: number
          name: string
          revenue: number | null
          show_on_profile: boolean | null
          show_revenue: boolean
          show_status: boolean | null
          status: string | null
          url: string
          user_id: string | null
          verified: boolean | null
        }
        Insert: {
          api_info?: Json | null
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          index: number
          name: string
          revenue?: number | null
          show_on_profile?: boolean | null
          show_status?: boolean | null
          status?: string | null
          url: string
          user_id?: string | null
          verified?: boolean | null
        }
        Update: {
          api_info?: Json | null
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          index?: number
          name?: string
          revenue?: number | null
          show_on_profile?: boolean | null
          show_status?: boolean | null
          status?: string | null
          url?: string
          user_id?: string | null
          verified?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "startups_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
