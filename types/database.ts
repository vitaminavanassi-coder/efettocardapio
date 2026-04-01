export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      inventory: {
        Row: {
          alert_threshold: number;
          item_id: string;
          quantity_current: number;
          unavailable_manual: boolean;
          updated_at: string;
        };
        Insert: {
          alert_threshold?: number;
          item_id: string;
          quantity_current?: number;
          unavailable_manual?: boolean;
          updated_at?: string;
        };
        Update: {
          alert_threshold?: number;
          item_id?: string;
          quantity_current?: number;
          unavailable_manual?: boolean;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "inventory_item_id_fkey";
            columns: ["item_id"];
            referencedRelation: "items";
            referencedColumns: ["id"];
          },
        ];
      };
      items: {
        Row: {
          active: boolean;
          category: string;
          created_at: string;
          description: string | null;
          highlight_order: number;
          id: string;
          image_url: string | null;
          name: string;
          slug: string;
        };
        Insert: {
          active?: boolean;
          category: string;
          created_at?: string;
          description?: string | null;
          highlight_order?: number;
          id?: string;
          image_url?: string | null;
          name: string;
          slug: string;
        };
        Update: {
          active?: boolean;
          category?: string;
          created_at?: string;
          description?: string | null;
          highlight_order?: number;
          id?: string;
          image_url?: string | null;
          name?: string;
          slug?: string;
        };
        Relationships: [];
      };
      order_items: {
        Row: {
          created_at: string;
          id: string;
          item_id: string;
          item_name_snapshot: string;
          order_id: string;
          quantity: number;
        };
        Insert: {
          created_at?: string;
          id?: string;
          item_id: string;
          item_name_snapshot: string;
          order_id: string;
          quantity?: number;
        };
        Update: {
          created_at?: string;
          id?: string;
          item_id?: string;
          item_name_snapshot?: string;
          order_id?: string;
          quantity?: number;
        };
        Relationships: [
          {
            foreignKeyName: "order_items_item_id_fkey";
            columns: ["item_id"];
            referencedRelation: "items";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "order_items_order_id_fkey";
            columns: ["order_id"];
            referencedRelation: "orders";
            referencedColumns: ["id"];
          },
        ];
      };
      orders: {
        Row: {
          created_at: string;
          delivered_at: string | null;
          id: string;
          patient_name: string;
          status: "novo" | "entregue";
        };
        Insert: {
          created_at?: string;
          delivered_at?: string | null;
          id?: string;
          patient_name: string;
          status?: "novo" | "entregue";
        };
        Update: {
          created_at?: string;
          delivered_at?: string | null;
          id?: string;
          patient_name?: string;
          status?: "novo" | "entregue";
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
