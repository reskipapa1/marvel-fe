import apiClient from '@/lib/axios';
import { ApiResponse } from '@/types';
import { AxiosResponse } from 'axios';

export interface AuditLog {
    id: number;
    user_id: number | null;
    action: string;
    entity_type: string | null;
    entity_id: number | null;
    old_values: Record<string, any> | null;
    new_values: Record<string, any> | null;
    ip_address: string | null;
    user_agent: string | null;
    created_at: string;
    updated_at: string;
    user?: {
        id: number;
        name: string;
        username: string;
        email: string;
        role: string;
    };
}

export const auditService = {
  // Get all audit logs with pagination and filters
  getAll(params?: {
    action?: string;
    user_id?: number;
    start_date?: string;
    end_date?: string;
  }): Promise<AxiosResponse<ApiResponse<{
    data: AuditLog[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  }>>> {
    return apiClient.get('/api/audit-logs', { params });
  },

  // Get audit logs for a specific entity
  getEntityLogs(entityType: string, entityId: number): Promise<AxiosResponse<ApiResponse<AuditLog[]>>> {
    return apiClient.get(`/api/audit-logs/entity/${entityType}/${entityId}`);
  }
};